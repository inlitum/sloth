import { Injectable }               from '@angular/core';
import { Title }                    from '@angular/platform-browser';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable ({
    providedIn: 'root'
})
export class HeaderService {

    public loading$: Subject<boolean>                                         = new BehaviorSubject<boolean> (false);
    private siteTitle: string                                                 = 'sloth'; // The base site title. TODO set this in the environment file
    public siteTitleChanged: Subject<{ title: string, page?: string | null }> = new BehaviorSubject ({ title: this.siteTitle });
    private pageName: string | null                                           = null; // The name of the current page. Null is for the home page.
    private currentlyLoading: string[]                                        = [];

    constructor (private _titleService: Title) {
    }

    /**
     * Sets the site's title page name
     * The structure of the page title is: [title] - [page name]
     * An example: sloth - start page
     * @param pageName The name of the current page
     */
    public setPageName (pageName: string | null) {
        // Stick to the lowercase theme bruv
        this.pageName = pageName ? pageName.toLowerCase () : pageName;

        this._titleService.setTitle (`${this.siteTitle}${pageName ? ' - ' + pageName : ''}`);

        this.siteTitleChanged.next ({ title: this.siteTitle, page: pageName });
    }

    /**
     * Flags the site for loading.
     * @param loadingKey The key used for the current loading.
     */
    public startLoadingForKey (loadingKey: string) {
        // Only add the key if the key isn't already stored.
        if (!this.currentlyLoading.includes (loadingKey)) {
            // Push the key.
            this.currentlyLoading.push (loadingKey);
        }

        this.checkIsLoading ();
    }

    /**
     * Stops the site loading with a given key.
     * @param loadingKey The key used for the current loading.
     */
    public stopLoadingForKey (loadingKey: string) {
        // Only remove the key if the key exists.
        if (this.currentlyLoading.includes (loadingKey)) {
            // Get the index of the given key
            let idx = this.currentlyLoading.indexOf (loadingKey);
            // Remove the key
            this.currentlyLoading.splice (idx);
        }
        this.checkIsLoading ();
    }

    /**
     * Stops loading for the entire site, regardless of if things are already loading.
     * This function should only be used in extreme cases.
     */
    public stopLoading () {
        this.currentlyLoading = [];
        this.checkIsLoading ();
    }

    // Function used to emit if there are keys that are flagged as loading.
    private checkIsLoading () {
        this.loading$.next (this.currentlyLoading.length > 0);
    }
}
