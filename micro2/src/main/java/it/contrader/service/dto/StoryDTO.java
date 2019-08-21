package it.contrader.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Story entity.
 */
public class StoryDTO implements Serializable {

    private Long id;

    @NotNull
    private String title;

    @NotNull
    private Integer category;

    @NotNull
    private String author;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getCategory() {
        return category;
    }

    public void setCategory(Integer category) {
        this.category = category;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StoryDTO storyDTO = (StoryDTO) o;
        if (storyDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), storyDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StoryDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", category=" + getCategory() +
            ", author='" + getAuthor() + "'" +
            "}";
    }
}
