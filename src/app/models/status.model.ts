import { Model }       from './model';
import { SidebarItem } from './sidebar-item.model';

export class Status extends Model{

    private _groups: string[] | null            = null;
    private _sidebarItems: SidebarItem[] | null = null

    constructor (data: { [key: string]: any }) {
        super ();
        this.processJson (data);
    }

    get groups (): string[] | null {
        return this._groups;
    }

    set groups (value: string[] | null) {
        this._groups = value;
    }

    get sidebarItems (): SidebarItem[] | null {
        return this._sidebarItems;
    }

    set sidebarItems (value: SidebarItem[] | null) {
        this._sidebarItems = value;
    }

    public hasAdminWriteGroup (): boolean {
        return this.hasGroup('admin_write');
    }

    public hasAdminReadGroup (): boolean {
        return this.hasGroup('admin_read') || this.hasAdminWriteGroup();
    }

    public hasWriteGroup (group: string): boolean {
        return this.hasGroup(group) || this.hasAdminWriteGroup();
    }

    public hasReadGroup (group: string): boolean {
        return this.hasGroup(group) || this.hasAdminReadGroup();
    }

    private hasGroup (group: string): boolean {
        if (this._groups == null) {
            return false;
        }

        for (let g of this._groups) {
            if (g === group) {
                return true;
            }
        }

        return false;
    }

}
