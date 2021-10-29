import {Component, Input, Output, EventEmitter} from '@angular/core';
@Component({
    moduleId: module.id,
    selector: 'app-gadget-header',
    templateUrl: './gadget-header.html',
    styleUrls: ['./styles-gadget.css']
})
export class GadgetHeaderComponent {
    @Input() title: string;
    @Input() showControls: boolean;
    @Input() inRun: boolean;
    @Input() inConfig: boolean;
    @Input() actionInitiated: boolean;
    @Input() showOperationControls: boolean;
    @Input() showConfigurationControl: boolean;
    @Input() gadgetHasOperationControls: boolean;
    @Input() globalOptions:any;
    @Output() removeEvent: EventEmitter<any> = new EventEmitter();
    @Output() toggleConfigModeEvent: EventEmitter<any> = new EventEmitter();
    @Output() runEvent: EventEmitter<any> = new EventEmitter();
    @Output() stopEvent: EventEmitter<any> = new EventEmitter();
    @Output() helpEvent: EventEmitter<any> = new EventEmitter();


    remove() {
        this.removeEvent.emit();
    }

    toggleConfigMode() {
        this.toggleConfigModeEvent.emit();
    }

    run() {

        this.runEvent.emit();

    }

    stop() {

        this.stopEvent.emit();
    }

    help(){
        this.helpEvent.emit();
    }

}
