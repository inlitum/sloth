import { SlothSidebarItem } from '../interface/sidebar.interface';
import { Model }            from './model';

export class SidebarItem extends Model implements SlothSidebarItem {
    private _active: boolean | null                              = null
    private _badge: string | null                                = null;
    private _children: SlothSidebarItem[] | null                 = null;
    private _color: string | null                                = null;
    private _icon: string | null                                 = null;
    private _id: number | null                                   = null;
    private _link: string | null                                 = null;
    private _text: string | null                                 = null;
    private _type: 'link' | 'header' | 'text' | 'section' | null = null;

    constructor (data: { [key: string]: any }) {
        super ();
        this.processJson (data);
    }

    get active (): boolean | null {
        return this._active;
    }

    set active (value: boolean | null) {
        this._active = value;
    }

    get badge (): string | null {
        return this._badge;
    }

    set badge (value: string | null) {
        this._badge = value;
    }

    get children (): SlothSidebarItem[] | null {
        return this._children;
    }

    set children (value: SlothSidebarItem[] | null) {
        this._children = value;
    }

    get color (): string | null {
        return this._color;
    }

    set color (value: string | null) {
        this._color = value;
    }

    get icon (): string | null {
        return this._icon;
    }

    set icon (value: string | null) {
        this._icon = value;
    }

    get id (): number | null {
        return this._id;
    }

    set id (value: number | null) {
        this._id = value;
    }

    get link (): string | null {
        return this._link;
    }

    set link (value: string | null) {
        this._link = value;
    }

    get text (): string | null {
        return this._text;
    }

    set text (value: string | null) {
        this._text = value;
    }

    get type (): "link" | "header" | "text" | "section" | null {
        return this._type;
    }

    set type (value: "link" | "header" | "text" | "section" | null) {
        this._type = value;
    }
}
