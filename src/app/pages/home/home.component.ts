import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { Speaker } from 'src/app/shared/interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchStr = '';
  speakers: Speaker[] = [];
  arrStorge: any[] = [];
  selectValue = '';
  loading: boolean = false;

  constructor(private readonly dataService: DataService) {}

  ngOnInit(): void {
    this.loading = true;

    setTimeout(() => {
      this.dataService.speakerSubject.subscribe((speakers) => {
        this.speakers = speakers;
        this.loading = false;

        this.speakers.map((speaker) => {
          let speakerStorage = JSON.parse(localStorage.getItem(speaker.id)!);

          if (speakerStorage !== null) {
            if (speakerStorage[0] === speaker.name) {
              speaker.favorite = true;
            }
          }
        });
      });
    }, 3000);
  }

  toggleFavorite(speaker: Speaker) {
    speaker.favorite = !speaker.favorite;

    if (speaker.favorite) {
      this.arrStorge.push(speaker.name);

      localStorage.setItem(speaker.id, JSON.stringify(this.arrStorge));

      this.arrStorge.length = 0;
    } else {
      localStorage.removeItem(speaker.id);
    }
  }

  changeFilter() {
    if (this.selectValue === 'favorites') {
      let favoriteSpeakers = this.speakers.filter(
        (speaker) => speaker.favorite === true
      );
      this.speakers = favoriteSpeakers;
    } else if (this.selectValue === 'all') {
      this.dataService.speakerSubject.subscribe((speakers) => {
        this.speakers = speakers;
      });
    } else if (this.selectValue === 'mostpopular') {
      this.speakers = this.speakers
        .sort((a, b) => b.rating - a.rating)
        .map((speaker) => speaker);
    }
  }
}
