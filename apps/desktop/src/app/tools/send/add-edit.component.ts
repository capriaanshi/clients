import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";

import { DialogServiceAbstraction } from "@bitwarden/angular/services/dialog";
import { AddEditComponent as BaseAddEditComponent } from "@bitwarden/angular/tools/send/add-edit.component";
import { EnvironmentService } from "@bitwarden/common/abstractions/environment.service";
import { I18nService } from "@bitwarden/common/abstractions/i18n.service";
import { LogService } from "@bitwarden/common/abstractions/log.service";
import { MessagingService } from "@bitwarden/common/abstractions/messaging.service";
import { PlatformUtilsService } from "@bitwarden/common/abstractions/platformUtils.service";
import { StateService } from "@bitwarden/common/abstractions/state.service";
import { PolicyService } from "@bitwarden/common/admin-console/abstractions/policy/policy.service.abstraction";
import { SendApiService } from "@bitwarden/common/tools/send/services/send-api.service.abstraction";
import { SendService } from "@bitwarden/common/tools/send/services/send.service.abstraction";

@Component({
  selector: "app-send-add-edit",
  templateUrl: "add-edit.component.html",
})
export class AddEditComponent extends BaseAddEditComponent {
  constructor(
    i18nService: I18nService,
    platformUtilsService: PlatformUtilsService,
    environmentService: EnvironmentService,
    datePipe: DatePipe,
    sendService: SendService,
    stateService: StateService,
    messagingService: MessagingService,
    policyService: PolicyService,
    logService: LogService,
    sendApiService: SendApiService,
    dialogService: DialogServiceAbstraction
  ) {
    super(
      i18nService,
      platformUtilsService,
      environmentService,
      datePipe,
      sendService,
      messagingService,
      policyService,
      logService,
      stateService,
      sendApiService,
      dialogService
    );
  }

  async refresh() {
    this.password = null;
    const send = await this.loadSend();
    this.send = await send.decrypt();
    this.hasPassword = this.send.password != null && this.send.password.trim() !== "";
  }

  cancel() {
    this.onCancelled.emit(this.send);
  }

  async copyLinkToClipboard(link: string) {
    super.copyLinkToClipboard(link);
    this.platformUtilsService.showToast(
      "success",
      null,
      this.i18nService.t("valueCopied", this.i18nService.t("sendLink"))
    );
  }
}
