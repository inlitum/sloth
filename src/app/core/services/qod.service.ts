import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface QODQuote {
    author: string,
    quote: string,
    tags: [
        string
    ],
    id: string,
    image: string,
    length: number
}

export interface QODContent {
    quotes: [
        QODQuote
    ];
}

export interface QOD {
    success: string,
    contents: QODContent
}

@Injectable ({
    providedIn: 'root'
})
export class QodService {

    private qodRestUrl = 'https://quotes.rest/qod';

    constructor (private httpClient: HttpClient) {

    }

    getQod (): Observable<QOD> {
        return this.httpClient.get<QOD> (this.qodRestUrl);
    }

}
