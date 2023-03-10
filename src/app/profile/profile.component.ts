import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgentService } from '../agent.service';
import { Method } from '../contract';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  server!: string;
  agent!: string;
  contract!: string;

  firstName: string = '';
  lastName: string = '';
  isDisabled = true;

  constructor(
    private route: ActivatedRoute,
    private agentService: AgentService
  ) { }

  ngOnInit(): void {
    this.server = decodeURIComponent(this.route.snapshot.paramMap.get('server') as string);
    this.agent = this.route.snapshot.paramMap.get('agent') as string;
    this.contract = this.route.snapshot.paramMap.get('contract') as string;
    this.onRead();
    this.agentService.listen(this.server, this.agent, this.contract).addEventListener('message', message => {
      if(message.data.length > 0) {
        this.onRead();
      }
    });
  }

  onRead() {
    let method = {} as Method;
    method.name = 'get_profile';
    method.values = {};
    this.agentService.read(this.server, this.agent, this.contract, method).subscribe((profile) => {
      if(profile) {
        this.firstName = profile.first_name;
        this.lastName = profile.last_name;
      }
    });
  }

  onWrite(event: any) {
    let method = {} as Method;
    method.name = 'set_value';
    method.values = {'key': 'first_name', 'value': this.firstName};
    this.agentService.write(this.server, this.agent, this.contract, method).subscribe((succeed) => {
      console.log(succeed);
    });
    method.values = {'key': 'last_name', 'value': this.lastName};
    this.agentService.write(this.server, this.agent, this.contract, method).subscribe((succeed) => {
      console.log(succeed);
    });
    this.isDisabled = true;
  }
}
