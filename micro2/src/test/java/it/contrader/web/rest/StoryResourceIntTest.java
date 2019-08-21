package it.contrader.web.rest;

import it.contrader.Micro2App;

import it.contrader.domain.Story;
import it.contrader.repository.StoryRepository;
import it.contrader.service.StoryService;
import it.contrader.service.dto.StoryDTO;
import it.contrader.service.mapper.StoryMapper;
import it.contrader.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static it.contrader.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the StoryResource REST controller.
 *
 * @see StoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Micro2App.class)
public class StoryResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final Integer DEFAULT_CATEGORY = 1;
    private static final Integer UPDATED_CATEGORY = 2;

    private static final String DEFAULT_AUTHOR = "AAAAAAAAAA";
    private static final String UPDATED_AUTHOR = "BBBBBBBBBB";

    @Autowired
    private StoryRepository storyRepository;


    @Autowired
    private StoryMapper storyMapper;
    

    @Autowired
    private StoryService storyService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStoryMockMvc;

    private Story story;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StoryResource storyResource = new StoryResource(storyService);
        this.restStoryMockMvc = MockMvcBuilders.standaloneSetup(storyResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Story createEntity(EntityManager em) {
        Story story = new Story()
            .title(DEFAULT_TITLE)
            .category(DEFAULT_CATEGORY)
            .author(DEFAULT_AUTHOR);
        return story;
    }

    @Before
    public void initTest() {
        story = createEntity(em);
    }

    @Test
    @Transactional
    public void createStory() throws Exception {
        int databaseSizeBeforeCreate = storyRepository.findAll().size();

        // Create the Story
        StoryDTO storyDTO = storyMapper.toDto(story);
        restStoryMockMvc.perform(post("/api/stories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storyDTO)))
            .andExpect(status().isCreated());

        // Validate the Story in the database
        List<Story> storyList = storyRepository.findAll();
        assertThat(storyList).hasSize(databaseSizeBeforeCreate + 1);
        Story testStory = storyList.get(storyList.size() - 1);
        assertThat(testStory.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testStory.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testStory.getAuthor()).isEqualTo(DEFAULT_AUTHOR);
    }

    @Test
    @Transactional
    public void createStoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = storyRepository.findAll().size();

        // Create the Story with an existing ID
        story.setId(1L);
        StoryDTO storyDTO = storyMapper.toDto(story);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStoryMockMvc.perform(post("/api/stories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storyDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Story in the database
        List<Story> storyList = storyRepository.findAll();
        assertThat(storyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = storyRepository.findAll().size();
        // set the field null
        story.setTitle(null);

        // Create the Story, which fails.
        StoryDTO storyDTO = storyMapper.toDto(story);

        restStoryMockMvc.perform(post("/api/stories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storyDTO)))
            .andExpect(status().isBadRequest());

        List<Story> storyList = storyRepository.findAll();
        assertThat(storyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCategoryIsRequired() throws Exception {
        int databaseSizeBeforeTest = storyRepository.findAll().size();
        // set the field null
        story.setCategory(null);

        // Create the Story, which fails.
        StoryDTO storyDTO = storyMapper.toDto(story);

        restStoryMockMvc.perform(post("/api/stories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storyDTO)))
            .andExpect(status().isBadRequest());

        List<Story> storyList = storyRepository.findAll();
        assertThat(storyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAuthorIsRequired() throws Exception {
        int databaseSizeBeforeTest = storyRepository.findAll().size();
        // set the field null
        story.setAuthor(null);

        // Create the Story, which fails.
        StoryDTO storyDTO = storyMapper.toDto(story);

        restStoryMockMvc.perform(post("/api/stories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storyDTO)))
            .andExpect(status().isBadRequest());

        List<Story> storyList = storyRepository.findAll();
        assertThat(storyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllStories() throws Exception {
        // Initialize the database
        storyRepository.saveAndFlush(story);

        // Get all the storyList
        restStoryMockMvc.perform(get("/api/stories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(story.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY)))
            .andExpect(jsonPath("$.[*].author").value(hasItem(DEFAULT_AUTHOR.toString())));
    }
    

    @Test
    @Transactional
    public void getStory() throws Exception {
        // Initialize the database
        storyRepository.saveAndFlush(story);

        // Get the story
        restStoryMockMvc.perform(get("/api/stories/{id}", story.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(story.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY))
            .andExpect(jsonPath("$.author").value(DEFAULT_AUTHOR.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingStory() throws Exception {
        // Get the story
        restStoryMockMvc.perform(get("/api/stories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStory() throws Exception {
        // Initialize the database
        storyRepository.saveAndFlush(story);

        int databaseSizeBeforeUpdate = storyRepository.findAll().size();

        // Update the story
        Story updatedStory = storyRepository.findById(story.getId()).get();
        // Disconnect from session so that the updates on updatedStory are not directly saved in db
        em.detach(updatedStory);
        updatedStory
            .title(UPDATED_TITLE)
            .category(UPDATED_CATEGORY)
            .author(UPDATED_AUTHOR);
        StoryDTO storyDTO = storyMapper.toDto(updatedStory);

        restStoryMockMvc.perform(put("/api/stories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storyDTO)))
            .andExpect(status().isOk());

        // Validate the Story in the database
        List<Story> storyList = storyRepository.findAll();
        assertThat(storyList).hasSize(databaseSizeBeforeUpdate);
        Story testStory = storyList.get(storyList.size() - 1);
        assertThat(testStory.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testStory.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testStory.getAuthor()).isEqualTo(UPDATED_AUTHOR);
    }

    @Test
    @Transactional
    public void updateNonExistingStory() throws Exception {
        int databaseSizeBeforeUpdate = storyRepository.findAll().size();

        // Create the Story
        StoryDTO storyDTO = storyMapper.toDto(story);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restStoryMockMvc.perform(put("/api/stories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storyDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Story in the database
        List<Story> storyList = storyRepository.findAll();
        assertThat(storyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStory() throws Exception {
        // Initialize the database
        storyRepository.saveAndFlush(story);

        int databaseSizeBeforeDelete = storyRepository.findAll().size();

        // Get the story
        restStoryMockMvc.perform(delete("/api/stories/{id}", story.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Story> storyList = storyRepository.findAll();
        assertThat(storyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Story.class);
        Story story1 = new Story();
        story1.setId(1L);
        Story story2 = new Story();
        story2.setId(story1.getId());
        assertThat(story1).isEqualTo(story2);
        story2.setId(2L);
        assertThat(story1).isNotEqualTo(story2);
        story1.setId(null);
        assertThat(story1).isNotEqualTo(story2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StoryDTO.class);
        StoryDTO storyDTO1 = new StoryDTO();
        storyDTO1.setId(1L);
        StoryDTO storyDTO2 = new StoryDTO();
        assertThat(storyDTO1).isNotEqualTo(storyDTO2);
        storyDTO2.setId(storyDTO1.getId());
        assertThat(storyDTO1).isEqualTo(storyDTO2);
        storyDTO2.setId(2L);
        assertThat(storyDTO1).isNotEqualTo(storyDTO2);
        storyDTO1.setId(null);
        assertThat(storyDTO1).isNotEqualTo(storyDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(storyMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(storyMapper.fromId(null)).isNull();
    }
}
