package it.contrader.service.mapper;

import it.contrader.domain.Story;
import it.contrader.service.dto.StoryDTO;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2019-08-21T09:32:56+0200",
    comments = "version: 1.2.0.Final, compiler: javac, environment: Java 1.8.0_202 (Oracle Corporation)"
)
@Component
public class StoryMapperImpl implements StoryMapper {

    @Override
    public Story toEntity(StoryDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Story story = new Story();

        story.setId( dto.getId() );
        story.setTitle( dto.getTitle() );
        story.setCategory( dto.getCategory() );
        story.setAuthor( dto.getAuthor() );

        return story;
    }

    @Override
    public StoryDTO toDto(Story entity) {
        if ( entity == null ) {
            return null;
        }

        StoryDTO storyDTO = new StoryDTO();

        storyDTO.setId( entity.getId() );
        storyDTO.setTitle( entity.getTitle() );
        storyDTO.setCategory( entity.getCategory() );
        storyDTO.setAuthor( entity.getAuthor() );

        return storyDTO;
    }

    @Override
    public List<Story> toEntity(List<StoryDTO> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<Story> list = new ArrayList<Story>( dtoList.size() );
        for ( StoryDTO storyDTO : dtoList ) {
            list.add( toEntity( storyDTO ) );
        }

        return list;
    }

    @Override
    public List<StoryDTO> toDto(List<Story> entityList) {
        if ( entityList == null ) {
            return null;
        }

        List<StoryDTO> list = new ArrayList<StoryDTO>( entityList.size() );
        for ( Story story : entityList ) {
            list.add( toDto( story ) );
        }

        return list;
    }
}
