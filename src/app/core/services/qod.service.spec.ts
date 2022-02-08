import { TestBed } from '@angular/core/testing';

import { QodService } from './qod.service';

describe ('QodService', () => {
    let service: QodService;

    beforeEach (() => {
        TestBed.configureTestingModule ({});
        service = TestBed.inject (QodService);
    });

    it ('should be created', () => {
        expect (service).toBeTruthy ();
    });
});
