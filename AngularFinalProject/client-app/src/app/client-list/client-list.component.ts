import { Component } from '@angular/core';
import { Client } from 'src/Client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent {
clients: Client[] = [];
  loading = false;
  errorMsg = '';

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.loading = true;
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMsg = 'Failed to load clients.';
        this.loading = false;
      }
    });
  }
}
