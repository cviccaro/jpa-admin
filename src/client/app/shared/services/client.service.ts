import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { LoggerService } from './logger.service';
import { XhrService } from './xhr';

@Injectable()
export class ClientService {
	constructor(public http: Http, private xhr: XhrService, private log: LoggerService) {
		this.http = http;
	}

    /**
     * Get all clients with filters and sorts
     * @param {params}
     * @return Observable<any>
     */
    all(params: {} = {}) {
        let query = new URLSearchParams();

        for (var key in params) {
            const param: string = params[key];
            query.set(key, param);
        }

        this.xhr.started();

        return this.http.get('/clients/paged', {search: query})
            .map(res => {
                this.xhr.finished();
                return res.json();
            });
    }

    /**
     * Return options as list consumable by SELECT OPtions
     */
	options() {
        this.xhr.started();

		return this.http.get('/options/clients')
			.map(res => {
                this.xhr.finished();
                return res.json();
            });
	}

    /**
     * Update an existing client
     * @param {[type]} id         [description]
     * @param {[type]} attributes [description]
     */
    update(id: number, values: any[]): Observable<any> {
        let form = new FormData();
        let _form = {};

        values.forEach(col => {
            let key = col.name;
            let value = col.value;

            switch(key) {
                case 'image':
                    if (value !== undefined && value !== null) {
                        form.append(key, col.value[0]);
                        _form[key] = col.value[0];
                    }
                    break;
                case 'featured':
                    if (value !== undefined && value !== null) {
                        form.append(key, col.value ? 1 : 0);
                        _form[key] = col.value ? 1 : 0;
                    }
                    break;
                default:
                    if (value !== undefined && value !== null) {
                        form.append(key, value);
                        _form[key] = value;
                    }
            }
        });

        this.log.log('update client with data: ', {
            values: values,
            form: form,
            _form: _form
        });

        this.xhr.started();

        return this.http.post('/clients/update/' + id, form)
            .map(res => {
                this.xhr.finished();
                return res.json();
            });
    }

    /**
     * Create new project
     * @param {[type]} values [description]
     */
    create(values: any[]): Observable<any> {
        let form = new FormData();
        let _form = {};

        values.forEach(col => {
            let key = col.name;
            let value = col.value;

            switch(key) {
                case 'image':
                    if (value !== undefined && value !== null) {
                        form.append(key, col.value[0]);
                        _form[key] = col.value[0];
                    }
                    break;
                case 'featured':
                    if (value !== undefined && value !== null) {
                        form.append(key, col.value ? 1 : 0);
                        _form[key] = col.value ? 1 : 0;
                    }
                    break;
                default:
                    if (value !== undefined && value !== null) {
                        form.append(key, value);
                        _form[key] = value;
                    }
            }
        });

        this.log.log('create client with data: ', {
            values: values,
            form: form,
            _form: _form
        });

        this.xhr.started();

        return this.http.post('/clients', form)
            .map(res => {
                this.xhr.finished();
                return res.json();
            });
    }

    destroy(id: number) {
        this.xhr.started();

        return Observable.create(observer => {
            this.http.delete(`/clients/${id}`)
                .subscribe(res => {
                    this.xhr.finished();
                    observer.next();
                    observer.complete();
                });
        });
    }
}
