import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profile = null
  constructor(private profileService:ProfileService) {
  
  }
  ngOnInit(): void {
    this.profileService.getCurrentUser().subscribe(res=>{
      if (res.success){
        this.profile = res.profile
        console.log(this.profile)
      }
    })
  }

}
