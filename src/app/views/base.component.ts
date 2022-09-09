import { SlothBackendService } from '../services/sloth-backend.service';

export class BaseComponent {

    constructor (
        protected sloth: SlothBackendService
    ) {

    }

    public hasGroup (group: string): boolean {
        return false;
    }

}
