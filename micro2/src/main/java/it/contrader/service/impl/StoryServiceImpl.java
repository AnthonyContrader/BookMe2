package it.contrader.service.impl;

import it.contrader.service.StoryService;
import it.contrader.domain.Story;
import it.contrader.repository.StoryRepository;
import it.contrader.service.dto.StoryDTO;
import it.contrader.service.mapper.StoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing Story.
 */
@Service
@Transactional
public class StoryServiceImpl implements StoryService {

    private final Logger log = LoggerFactory.getLogger(StoryServiceImpl.class);

    private final StoryRepository storyRepository;

    private final StoryMapper storyMapper;

    public StoryServiceImpl(StoryRepository storyRepository, StoryMapper storyMapper) {
        this.storyRepository = storyRepository;
        this.storyMapper = storyMapper;
    }

    /**
     * Save a story.
     *
     * @param storyDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public StoryDTO save(StoryDTO storyDTO) {
        log.debug("Request to save Story : {}", storyDTO);
        Story story = storyMapper.toEntity(storyDTO);
        story = storyRepository.save(story);
        return storyMapper.toDto(story);
    }

    /**
     * Get all the stories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<StoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Stories");
        return storyRepository.findAll(pageable)
            .map(storyMapper::toDto);
    }


    /**
     * Get one story by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<StoryDTO> findOne(Long id) {
        log.debug("Request to get Story : {}", id);
        return storyRepository.findById(id)
            .map(storyMapper::toDto);
    }

    /**
     * Delete the story by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Story : {}", id);
        storyRepository.deleteById(id);
    }
}
