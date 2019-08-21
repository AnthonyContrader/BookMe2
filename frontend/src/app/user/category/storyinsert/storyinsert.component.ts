import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryDTO } from 'src/dto/categorydto';
import { StoryDTO } from 'src/dto/storydto';
import { StoryService } from 'src/service/story.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { SharedService } from '../sharedservice/shared.service';
import { Subscription } from 'rxjs';
import { UserDTO } from 'src/dto/userdto';

@Component({
  selector: 'app-storyinsert',
  templateUrl: './storyinsert.component.html',
  styleUrls: ['./storyinsert.component.css']
})
export class StoryinsertComponent implements OnInit {


  storytoinsert: StoryDTO = new StoryDTO();
  subscription: Subscription;
  author: UserDTO;
  category: CategoryDTO;

  constructor(private storyService: StoryService, private sharedService: SharedService) { 
    // this.subscription = this.sharedService.$categorySource.subscribe(
    //   category => this.storytoinsert.category = category
    // );
  }

  ngOnInit() {
  }

  insertStory(){
    this.author = JSON.parse(localStorage.getItem('currentUser'));
    this.storytoinsert.author = this.author.firstName;
    this.category=JSON.parse(localStorage.getItem('currentCategory'));
    this.storytoinsert.category = this.category.id;
    this.storyService.insert(this.storytoinsert)
    .subscribe();
    this.sharedService.reloadCategory();
    // this.storytoinsert = new StoryDTO();
  }


}
