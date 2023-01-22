import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Contract, Method } from './contract';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  listen(server: string, identity: string, contract: string): EventSource {
    return new EventSource(`${server}stream/${identity}/${contract}`);
  }

  write(server: string, identity: string, contract: string, method: Method): Observable<any> {
    const url = `${server}ibc/app/${identity}/${contract}/${method.name}`;
    let params = new HttpParams().set('action', 'contract_write');
    return this.http.post<any>(url, method, {...this.httpOptions, params: params}).pipe(
      tap(_ => console.log('wrote something')),
      catchError(this.handleError<any>(`write name=${name}`))
    );
  }

  read(server: string, identity: string, contract: string, method: Method): Observable<any> {
    const url = `${server}ibc/app/${identity}/${contract}/${method.name}`;
    let params = new HttpParams().set('action', 'contract_read');
    return this.http.put<any>(url, method, {...this.httpOptions, params: params}).pipe(
      tap(_ => console.log('read something')),
      catchError(this.handleError<any>(`read name=${name}`))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
