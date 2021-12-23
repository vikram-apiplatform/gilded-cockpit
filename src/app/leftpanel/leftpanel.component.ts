import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

export interface Menu {
    name: string;
    iconClass: string;
    active: boolean;
    submenu: { name: string, key: string, icon: string }[];
}

export interface Config {
    // selector?: String,
    multi?: boolean;
}

declare let $;

@Component({
    selector: 'app-leftpanel',
    templateUrl: './leftpanel.component.html',
    styleUrls: ['./leftpanel.component.css']
})
export class LeftpanelComponent implements OnInit {

    @Input() options;
    @Input() showFiller = false;
    @Input() menus: any;
    @Input() defaultActiveMenu: any;
    @Output() menuItemSelected: EventEmitter<any> = new EventEmitter<any>();
    config: Config;
    @Input() activeMenu = '';

    ngOnInit() {
        this.config = this.mergeConfig(this.options);
    }

    mergeConfig(options: Config) {
        // 기본 옵션
        const config = {
            // selector: '#accordion',
            multi: true
        };

        return {...config, ...options};
    }

    toggle(index: number) {
        // 멀티 오픈을 허용하지 않으면 타깃 이외의 모든 submenu를 클로즈한다.
        if (!this.config.multi) {
            this.menus.filter(
                (menu, i) => i !== index && menu.active
            ).forEach(menu => menu.active = !menu.active);
        }

        // Menu의 active를 반전
        this.menus[index].active = !this.menus[index].active;
    }

    getId(id) {
        if (id !== '') {
            const str = id.split(' ').join('');
            return '#' + str;
        }
        return '';
    }

    onItemSelected(item, parentMenuName, itemName, key, route) {
        //$('.submenu li').removeClass('active');
        $(item.target).addClass('active');
        this.activeMenu = key;
        this.menuItemSelected.emit({parent: parentMenuName, child: itemName, route: route});
    }

}
