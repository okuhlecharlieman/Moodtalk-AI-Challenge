<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
    <#if section = "header">
        ${msg("magicLinkText")}
    <#elseif section = "form">
        <div id="magic-link-success-message" class="${properties.kcMagicLinkSuccessMessage!}">
            ${msg("magicLinkText")}
        </div>
    </#if>
</@layout.registrationLayout>