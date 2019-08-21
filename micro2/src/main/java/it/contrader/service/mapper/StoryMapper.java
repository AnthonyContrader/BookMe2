package it.contrader.service.mapper;

import it.contrader.domain.*;
import it.contrader.service.dto.StoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Story and its DTO StoryDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface StoryMapper extends EntityMapper<StoryDTO, Story> {



    default Story fromId(Long id) {
        if (id == null) {
            return null;
        }
        Story story = new Story();
        story.setId(id);
        return story;
    }
}
