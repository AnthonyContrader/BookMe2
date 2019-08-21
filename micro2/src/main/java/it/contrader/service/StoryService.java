package it.contrader.service;

import it.contrader.service.dto.StoryDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Story.
 */
public interface StoryService {

    /**
     * Save a story.
     *
     * @param storyDTO the entity to save
     * @return the persisted entity
     */
    StoryDTO save(StoryDTO storyDTO);

    /**
     * Get all the stories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<StoryDTO> findAll(Pageable pageable);


    /**
     * Get the "id" story.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<StoryDTO> findOne(Long id);

    /**
     * Delete the "id" story.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
