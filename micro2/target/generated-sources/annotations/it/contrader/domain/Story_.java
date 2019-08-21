package it.contrader.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Story.class)
public abstract class Story_ {

	public static volatile SingularAttribute<Story, String> author;
	public static volatile SingularAttribute<Story, Long> id;
	public static volatile SingularAttribute<Story, String> title;
	public static volatile SingularAttribute<Story, Integer> category;

}

