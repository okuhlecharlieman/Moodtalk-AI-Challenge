<#import "template.ftl" as layout>
<#import "password-commons.ftl" as passwordCommons>
<@layout.registrationLayout displayRequiredFields=false displayMessage=!messagesPerField.existsError('totp','userLabel'); section>

    <#if section = "header">
        ${msg("loginTotpTitle")}
    <#elseif section = "form">
        <ol id="kc-totp-settings" class="text-start fs-s">
            <li class="mb-5">
                <p>${msg("loginTotpStep1")}</p>

                <ul class="list-group list-group-flush" id="kc-totp-supported-apps">
                    <#list totp.supportedApplications as app>
                        <li class="list-group-item fs-s">${msg(app)}</li>
                    </#list>
                </ul>
            </li>

            <#if mode?? && mode = "manual">
                <li class="mb-5">
                    <p>${msg("loginTotpManualStep2")}</p>
                    <p><span id="kc-totp-secret-key">${totp.totpSecretEncoded}</span></p>
                    <p><a href="${totp.qrUrl}" id="mode-barcode">${msg("loginTotpScanBarcode")}</a></p>
                </li>
                <li>
                    <p>${msg("loginTotpManualStep3")}</p>
                    <p>
                    <ul>
                        <li id="kc-totp-type">${msg("loginTotpType")}: ${msg("loginTotp." + totp.policy.type)}</li>
                        <li id="kc-totp-algorithm">${msg("loginTotpAlgorithm")}: ${totp.policy.getAlgorithmKey()}</li>
                        <li id="kc-totp-digits">${msg("loginTotpDigits")}: ${totp.policy.digits}</li>
                        <#if totp.policy.type = "totp">
                            <li id="kc-totp-period">${msg("loginTotpInterval")}: ${totp.policy.period}</li>
                        <#elseif totp.policy.type = "hotp">
                            <li id="kc-totp-counter">${msg("loginTotpCounter")}: ${totp.policy.initialCounter}</li>
                        </#if>
                    </ul>
                    </p>
                </li>
            <#else>
                <li class="mb-5">
                    <p>${msg("loginTotpStep2")}</p>
                    <img id="kc-totp-secret-qr-code" src="data:image/png;base64, ${totp.totpSecretQrCode}" alt="Figure: Barcode"><br/>
                    <p><a href="${totp.manualUrl}" id="mode-manual">${msg("loginTotpUnableToScan")}</a></p>
                </li>
            </#if>
            <li class="mb-5">
                <p>${msg("loginTotpStep3")}</p>
                <p>${msg("loginTotpStep3DeviceName")}</p>
            </li>
        </ol>

        <form action="${url.loginAction}" class="${properties.kcFormClass!}" id="kc-totp-settings-form" method="post">
            <div class="${properties.kcFormGroupClass!}">
                <div class="d-flex flex-row gap-1 fs-s">
                    <label for="totp" class="control-label">${msg("authenticatorCode")}</label> <span class="required">*</span>
                </div>
                <div class="${properties.kcInputWrapperClass!}">
                    <input type="text" id="totp" name="totp" autocomplete="off" class="${properties.kcInputClass!}"
                           aria-invalid="<#if messagesPerField.existsError('totp')>true</#if>"
                    />

                    <#if messagesPerField.existsError('totp')>
                        <span id="input-error-otp-code" class="fs-s ${properties.kcInputErrorMessageClass!}" aria-live="polite">
                            ${kcSanitize(messagesPerField.get('totp'))?no_esc}
                        </span>
                    </#if>

                </div>
                <input type="hidden" id="totpSecret" name="totpSecret" value="${totp.totpSecret}" />
                <#if mode??><input type="hidden" id="mode" name="mode" value="${mode}"/></#if>
            </div>

            <div class="${properties.kcFormGroupClass!}">
                <div class="d-flex flex-row gap-1 fs-s">
                    <label for="userLabel" class="control-label">${msg("loginTotpDeviceName")}</label> <#if totp.otpCredentials?size gte 1><span class="required">*</span></#if>
                </div>

                <div class="${properties.kcInputWrapperClass!}">
                    <input type="text" class="${properties.kcInputClass!}" id="userLabel" name="userLabel" autocomplete="off"
                           aria-invalid="<#if messagesPerField.existsError('userLabel')>true</#if>"
                    />

                    <#if messagesPerField.existsError('userLabel')>
                        <span id="input-error-otp-label" class="fs-s ${properties.kcInputErrorMessageClass!}" aria-live="polite">
                            ${kcSanitize(messagesPerField.get('userLabel'))?no_esc}
                        </span>
                    </#if>
                </div>
            </div>

            <div class="${properties.kcFormGroupClass!} mb-5">
                <@passwordCommons.logoutOtherSessions/>
            </div>

            <#if isAppInitiatedAction??>
                <div class="d-flex flex-row gap-3 justify-content-center">
                    <input type="submit"
                           class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonLargeClass!}"
                           id="saveTOTPBtn" value="${msg("doSubmit")}"
                    />
                    <button type="submit"
                            class="btn position-relative m-0 btn-secondary px-5 align-self-center"
                            id="cancelTOTPBtn" name="cancel-aia" value="true" />${msg("doCancel")}
                    </button>
                </div>
            <#else>
                <input type="submit"
                       class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}"
                       id="saveTOTPBtn" value="${msg("doSubmit")}"
                />
            </#if>
        </form>
    </#if>
</@layout.registrationLayout>