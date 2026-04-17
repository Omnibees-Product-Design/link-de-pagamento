#!/usr/bin/env python3
# make_v3.py — Cria v3.html e v3-pay.html a partir de v2.html e v2-pay.html
# com inputs Material Design 3 Outlined Text Field

import os, re

BASE = r'C:\Users\rodrigo.barros\Desktop\Bee2Pay'

M3_CSS = r"""    .field-row {
      display: flex;
      gap: 12px;
    }

    .field-row .field-group { flex: 1 1 0; min-width: 0; }

    /* ─── M3 OUTLINED TEXT FIELD ─── */
    .m3-field {
      position: relative;
    }
    .m3-input {
      width: 100%;
      height: 56px;
      padding: 16px;
      border: 1px solid #79747E;
      border-radius: 4px;
      background: #fff;
      font-size: 16px;
      font-family: 'Open Sans', sans-serif;
      color: #1C1B1F;
      outline: none;
      transition: border-color 0.15s;
      box-sizing: border-box;
      appearance: none;
      -webkit-appearance: none;
    }
    .m3-input:hover { border-color: #1C1B1F; }
    .m3-input:focus {
      border: 2px solid #F5AF04;
      padding: 15px;
    }
    .m3-label {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 16px;
      color: #49454F;
      background: #fff;
      padding: 0 4px;
      pointer-events: none;
      transition: all 0.15s cubic-bezier(0.4,0,0.2,1);
      line-height: 1;
      z-index: 1;
      white-space: nowrap;
    }
    .m3-input:focus ~ .m3-label,
    .m3-input:not(:placeholder-shown) ~ .m3-label {
      top: 0;
      font-size: 12px;
      color: #49454F;
      transform: translateY(-50%);
    }
    .m3-input:focus ~ .m3-label { color: #F5AF04; }
    .m3-label--float {
      top: 0 !important;
      font-size: 12px !important;
      transform: translateY(-50%) !important;
      color: #49454F;
    }
    .m3-field--combo { position: relative; }
    .m3-combo-input {
      border: 1px solid #79747E;
      border-radius: 4px;
      background: #fff;
      min-height: 56px;
      transition: border-color 0.15s;
    }
    .m3-combo-input:hover { border-color: #1C1B1F; }
    .m3-combo-input:focus-within { border: 2px solid #F5AF04; }
    .m3-trailing {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
    }
    .m3-field.error .m3-input { border-color: #B3261E !important; }
    .m3-field.error .m3-label,
    .m3-field.error .m3-label--float { color: #B3261E !important; }
    .m3-field.error .m3-combo-input { border-color: #B3261E !important; }

    /* Wrapper for inputs with icons/addons (kept for compat) */
    .input-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }"""

OLD_CSS_BLOCK = """    .field-label {
      font-size: 11px;
      font-weight: 600;
      color: #273240;
      text-transform: uppercase;
      letter-spacing: 0.07em;
    }

    .field-row {
      display: flex;
      gap: 12px;
    }

    .field-row .field-group { flex: 1; }

    input, select {
      width: 100%;
      height: 48px;
      padding: 0 16px;
      background: rgba(255,255,255,0.92);
      border: 1px solid #C5C5C5;
      border-radius: 4px;
      font-size: 14px;
      font-family: 'Open Sans', -apple-system, sans-serif;
      color: #273240;
      outline: none;
      transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
      appearance: none;
      -webkit-appearance: none;
      box-shadow: none;
    }

    input:not(.combo-search-input):hover, select:hover {
      border-color: #4E4076;
    }

    input::placeholder { color: #9C9C9C; }

    input:not(.combo-search-input):focus, select:focus {
      border-color: #4E4076;
      box-shadow: none;
      background: #fff;
    }

    select option { background: #fff; color: #273240; }

    /* Wrapper for inputs with icons/addons */
    .input-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-wrap input { padding-right: 14px; }

    /* CEP: input deixa espaço para o botão pill */
    #cep-wrap input { padding-right: 108px; }"""

# v2-pay.html has a slightly different CSS block (no combo-search-input selectors, no cep-wrap)
OLD_CSS_BLOCK_PAY = """    .field-label {
      font-size: 11px;
      font-weight: 600;
      color: #273240;
      text-transform: uppercase;
      letter-spacing: 0.07em;
    }

    .field-row {
      display: flex;
      gap: 12px;
    }

    .field-row .field-group { flex: 1; }

    input, select {
      width: 100%;
      height: 48px;
      padding: 0 16px;
      background: rgba(255,255,255,0.92);
      border: 1px solid #C5C5C5;
      border-radius: 4px;
      font-size: 14px;
      font-family: 'Open Sans', -apple-system, sans-serif;
      color: #273240;
      outline: none;
      transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
      appearance: none;
      -webkit-appearance: none;
      box-shadow: none;
    }

    input:hover, select:hover {
      border-color: #4E4076;
    }

    input::placeholder { color: #9C9C9C; }

    input:focus, select:focus {
      border-color: #C5C5C5;
      box-shadow: 0 0 0 3px rgba(0,0,0,0.05);
      background: #fff;
    }

    select option { background: #fff; color: #273240; }

    /* Wrapper for inputs with icons/addons */
    .input-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-wrap input { padding-right: 14px; }"""


def transform_v3(src_file, dst_file, is_pay=False):
    with open(src_file, 'r', encoding='utf-8') as f:
        h = f.read()

    # Title
    if is_pay:
        h = h.replace('Pagamento — Bee2Pay Yellow', 'Pagamento — V3 Bee2Pay Material Design')
    else:
        h = h.replace('Pagamento — V2 Bee2Pay Yellow', 'Pagamento — V3 Bee2Pay Material Design')

    # CSS swap
    css_block = OLD_CSS_BLOCK_PAY if is_pay else OLD_CSS_BLOCK
    replaced = h.replace(css_block, M3_CSS)
    if replaced == h:
        print(f'WARNING: CSS block not found in {src_file}!')
    h = replaced

    # cep-loading fix
    h = h.replace('.cep-loading input { opacity: 0.7; }', '.cep-loading .m3-input { opacity: 0.7; }')

    # mobile combo height
    h = h.replace('      .combo-field { height: 48px; }', '      .combo-field { min-height: 56px; }')

    # ── Combo-field: align with MD3 (height 56px, yellow focus, dark hover) ──
    h = h.replace(
        '      height: 48px;\n'
        '      background: rgba(255,255,255,0.8);\n'
        '      border: 1px solid #C5C5C5;\n'
        '      border-radius: 4px;\n'
        '      transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;\n'
        '      width: 100%;\n'
        '    }\n'
        '    .combo-field:hover:not(.combo-open) { border-color: #4E4076; }\n'
        '    .combo-field:focus-within,\n'
        '    .combo-field.combo-open {\n'
        '      border-color: #4E4076;\n'
        '      box-shadow: none;\n'
        '      background: #fff;\n'
        '    }',
        '      height: 56px;\n'
        '      background: #fff;\n'
        '      border: 1px solid #79747E;\n'
        '      border-radius: 4px;\n'
        '      transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;\n'
        '      width: 100%;\n'
        '      box-sizing: border-box;\n'
        '    }\n'
        '    .combo-field:hover:not(.combo-open) { border-color: #1C1B1F; }\n'
        '    .combo-field:focus-within,\n'
        '    .combo-field.combo-open {\n'
        '      border: 2px solid #F5AF04;\n'
        '      background: #fff;\n'
        '    }'
    )

    # Combo trigger/input font: 14px → 16px, color #273240 → #1C1B1F
    h = h.replace(
        '      font-family: \'Open Sans\', -apple-system, sans-serif;\n'
        '      font-size: 14px;\n'
        '      color: #273240;\n'
        '      white-space: nowrap;',
        '      font-family: \'Open Sans\', -apple-system, sans-serif;\n'
        '      font-size: 16px;\n'
        '      color: #1C1B1F;\n'
        '      white-space: nowrap;'
    )
    h = h.replace(
        '      font-family: \'Open Sans\', -apple-system, sans-serif;\n'
        '      font-size: 14px;\n'
        '      color: #273240;\n'
        '      cursor: pointer;\n'
        '      padding: 0;\n'
        '    }',
        '      font-family: \'Open Sans\', -apple-system, sans-serif;\n'
        '      font-size: 16px;\n'
        '      color: #1C1B1F;\n'
        '      cursor: pointer;\n'
        '      padding: 0;\n'
        '    }'
    )
    h = h.replace(
        '      padding: 0 16px;\n'
        '      font-family: \'Open Sans\', -apple-system, sans-serif;\n'
        '      font-size: 14px;\n'
        '      color: #273240;\n'
        '    }\n'
        '    .combo-input::placeholder',
        '      padding: 0 16px;\n'
        '      font-family: \'Open Sans\', -apple-system, sans-serif;\n'
        '      font-size: 16px;\n'
        '      color: #1C1B1F;\n'
        '    }\n'
        '    .combo-input::placeholder'
    )

    # ── STEP 1: Nome completo ──
    h = h.replace(
        '        <div class="field-group">\n'
        '          <label class="field-label">Nome completo</label>\n'
        '          <input type="text" id="f-nome" placeholder="Alberto Roberto" autocomplete="name" value="Alberto Roberto" />\n'
        '        </div>',
        '        <div class="field-group">\n'
        '          <div class="m3-field">\n'
        '            <input type="text" id="f-nome" class="m3-input" placeholder=" " autocomplete="name" value="Alberto Roberto" />\n'
        '            <label class="m3-label" for="f-nome">Nome completo</label>\n'
        '          </div>\n'
        '        </div>'
    )

    # ── E-mail ──
    h = h.replace(
        '        <div class="field-group">\n'
        '          <label class="field-label">E-mail</label>\n'
        '          <input type="email" id="f-email" placeholder="seu@email.com" autocomplete="email" />\n'
        '        </div>',
        '        <div class="field-group">\n'
        '          <div class="m3-field">\n'
        '            <input type="email" id="f-email" class="m3-input" placeholder=" " autocomplete="email" />\n'
        '            <label class="m3-label" for="f-email">E-mail</label>\n'
        '          </div>\n'
        '        </div>'
    )

    # ── Data de nascimento ──
    h = h.replace(
        '          <div class="field-group">\n'
        '            <label class="field-label">Data de nascimento</label>\n'
        '            <input type="text" id="f-dob" placeholder="DD/MM/AAAA" maxlength="10" inputmode="numeric" />\n'
        '          </div>',
        '          <div class="field-group">\n'
        '            <div class="m3-field">\n'
        '              <input type="text" id="f-dob" class="m3-input" placeholder=" " maxlength="10" inputmode="numeric" />\n'
        '              <label class="m3-label" for="f-dob">Data de nascimento</label>\n'
        '            </div>\n'
        '          </div>'
    )

    # ── País combo ──
    h = h.replace(
        '          <div class="field-group">\n'
        '            <label class="field-label">País</label>\n'
        '            <div class="combo-field flag-select-field" id="combo-pais">',
        '          <div class="field-group">\n'
        '            <div class="m3-field m3-field--combo">\n'
        '              <div class="combo-field flag-select-field m3-combo-input" id="combo-pais">'
    )
    # Close País combo (the closing </div> of combo-pais + field-group, then start Telefone)
    h = h.replace(
        '            </div>\n'
        '          </div>\n'
        '        </div>\n'
        '\n'
        '        <div class="field-row">\n'
        '        <div class="field-group">\n'
        '          <label class="field-label">Telefone</label>\n'
        '          <div class="combo-field" id="combo-ddi">',
        '              </div>\n'
        '              <label class="m3-label m3-label--float">País</label>\n'
        '            </div>\n'
        '          </div>\n'
        '        </div>\n'
        '\n'
        '        <div class="field-row">\n'
        '        <div class="field-group">\n'
        '          <div class="m3-field m3-field--combo">\n'
        '            <div class="combo-field m3-combo-input" id="combo-ddi">'
    )
    # Close DDI combo + open Documento
    h = h.replace(
        '          </div>\n'
        '        </div>\n'
        '\n'
        '        <div class="field-group">\n'
        '          <label class="field-label">Documento</label>\n'
        '          <div class="combo-field" id="combo-doc">',
        '          </div>\n'
        '            <label class="m3-label m3-label--float">Telefone / Celular</label>\n'
        '          </div>\n'
        '        </div>\n'
        '\n'
        '        <div class="field-group">\n'
        '          <div class="m3-field m3-field--combo">\n'
        '            <div class="combo-field m3-combo-input" id="combo-doc">'
    )
    # Close Documento combo
    h = h.replace(
        '          </div>\n'
        '        </div>\n'
        '        </div><!-- /field-row telefone+documento -->',
        '          </div>\n'
        '            <label class="m3-label m3-label--float">Documento</label>\n'
        '          </div>\n'
        '        </div>\n'
        '        </div><!-- /field-row telefone+documento -->'
    )

    # ── CEP ──
    h = h.replace(
        '        <div class="field-group">\n'
        '          <label class="field-label">CEP</label>\n'
        '          <div class="input-wrap" id="cep-wrap">\n'
        '            <input type="text" id="f-cep" placeholder="00000-000" maxlength="9" inputmode="numeric" />\n'
        '            <span class="input-addon-right" onclick="lookupCEP()">\n'
        '              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">\n'
        '                <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" stroke-width="1.5"/>\n'
        '                <path d="M11 11l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>\n'
        '              </svg>\n'
        '            </span>\n'
        '          </div>\n'
        '        </div>',
        '        <div class="field-group">\n'
        '          <div class="m3-field" id="cep-wrap">\n'
        '            <input type="text" id="f-cep" class="m3-input" placeholder=" " maxlength="9" inputmode="numeric" style="padding-right:52px;" />\n'
        '            <label class="m3-label" for="f-cep">CEP</label>\n'
        '            <span class="m3-trailing input-addon-right" onclick="lookupCEP()">\n'
        '              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">\n'
        '                <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" stroke-width="1.5"/>\n'
        '                <path d="M11 11l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>\n'
        '              </svg>\n'
        '            </span>\n'
        '          </div>\n'
        '        </div>'
    )

    # ── Logradouro ──
    h = h.replace(
        '          <div class="field-group" style="flex:1;">\n'
        '            <label class="field-label">Logradouro</label>\n'
        '            <input type="text" id="f-logradouro" placeholder="Rua, Avenida, Travessa..." autocomplete="street-address" />\n'
        '          </div>',
        '          <div class="field-group" style="flex:1;">\n'
        '            <div class="m3-field">\n'
        '              <input type="text" id="f-logradouro" class="m3-input" placeholder=" " autocomplete="street-address" />\n'
        '              <label class="m3-label" for="f-logradouro">Logradouro</label>\n'
        '            </div>\n'
        '          </div>'
    )

    # ── Número (endereço) ──
    h = h.replace(
        '          <div class="field-group" style="flex:0 0 120px;">\n'
        '            <label class="field-label">Número</label>\n'
        '            <input type="text" id="f-numero" placeholder="123" />\n'
        '          </div>',
        '          <div class="field-group" style="flex:0 0 120px;">\n'
        '            <div class="m3-field">\n'
        '              <input type="text" id="f-numero" class="m3-input" placeholder=" " />\n'
        '              <label class="m3-label" for="f-numero">Número</label>\n'
        '            </div>\n'
        '          </div>'
    )

    # ── Complemento ──
    h = h.replace(
        '          <div class="field-group" style="flex:1;">\n'
        '            <label class="field-label">Complemento</label>\n'
        '            <input type="text" id="f-complemento" placeholder="Apto, Bloco..." />\n'
        '          </div>',
        '          <div class="field-group" style="flex:1;">\n'
        '            <div class="m3-field">\n'
        '              <input type="text" id="f-complemento" class="m3-input" placeholder=" " />\n'
        '              <label class="m3-label" for="f-complemento">Complemento</label>\n'
        '            </div>\n'
        '          </div>'
    )

    # ── Bairro ──
    h = h.replace(
        '          <div class="field-group" style="flex:1;">\n'
        '            <label class="field-label">Bairro</label>\n'
        '            <input type="text" id="f-bairro" placeholder="Nome do bairro" />\n'
        '          </div>',
        '          <div class="field-group" style="flex:1;">\n'
        '            <div class="m3-field">\n'
        '              <input type="text" id="f-bairro" class="m3-input" placeholder=" " />\n'
        '              <label class="m3-label" for="f-bairro\">Bairro</label>\n'
        '            </div>\n'
        '          </div>'
    )

    # ── Estado combo ──
    h = h.replace(
        '          <div class="field-group">\n'
        '            <label class="field-label">Estado</label>\n'
        '            <div class="combo-field estado-combo" id="estado-combo" style="height:48px;">',
        '          <div class="field-group">\n'
        '            <div class="m3-field m3-field--combo">\n'
        '              <div class="combo-field estado-combo m3-combo-input" id="estado-combo" style="min-height:56px;">'
    )
    h = h.replace(
        '            </div>\n'
        '          </div>\n'
        '          <div class="field-group">\n'
        '            <label class="field-label">Cidade</label>\n'
        '            <input type="text" id="f-cidade" placeholder="São Paulo" />\n'
        '          </div>',
        '              </div>\n'
        '              <label class="m3-label m3-label--float">Estado</label>\n'
        '            </div>\n'
        '          </div>\n'
        '          <div class="field-group">\n'
        '            <div class="m3-field">\n'
        '              <input type="text" id="f-cidade" class="m3-input" placeholder=" " />\n'
        '              <label class="m3-label" for="f-cidade">Cidade</label>\n'
        '            </div>\n'
        '          </div>'
    )

    # ── Número do cartão ──
    h = h.replace(
        '        <div class="field-group">\n'
        '          <label class="field-label">Número do cartão</label>\n'
        '          <div class="input-wrap">\n'
        '            <input type="text" id="f-cardnum" placeholder="0000 0000 0000 0000" maxlength="19" inputmode="numeric" autocomplete="new-password"\n'
        '              oninput="handleCardNumber(this)" style="padding-right: 48px;" />',
        '        <div class="field-group">\n'
        '          <div class="m3-field">\n'
        '            <input type="text" id="f-cardnum" class="m3-input" placeholder=" " maxlength="19" inputmode="numeric" autocomplete="new-password"\n'
        '              oninput="handleCardNumber(this)" style="padding-right:52px;" />\n'
        '            <label class="m3-label" for="f-cardnum">Número do cartão</label>'
    )
    # Close the old input-wrap div
    h = h.replace(
        '            </div>\n'
        '          </div>\n'
        '        </div>\n'
        '\n'
        '        <div class="field-row">\n'
        '          <div class="field-group">\n'
        '            <label class="field-label">Validade</label>\n'
        '            <input type="text" id="f-expiry" placeholder="MM/AA" maxlength="5" inputmode="numeric" autocomplete="new-password"\n'
        '              oninput="handleExpiry(this)" />\n'
        '          </div>',
        '          </div>\n'
        '        </div>\n'
        '\n'
        '        <div class="field-row">\n'
        '          <div class="field-group">\n'
        '            <div class="m3-field">\n'
        '              <input type="text" id="f-expiry" class="m3-input" placeholder=" " maxlength="5" inputmode="numeric" autocomplete="new-password"\n'
        '                oninput="handleExpiry(this)" />\n'
        '              <label class="m3-label" for="f-expiry">Validade</label>\n'
        '            </div>\n'
        '          </div>'
    )

    # ── CVV ──
    h = h.replace(
        '          <div class="field-group">\n'
        '            <label class="field-label">CVV</label>\n'
        '            <div class="cvv-wrap">\n'
        '              <input type="text" id="f-cvv" placeholder="123" maxlength="4" inputmode="numeric" autocomplete="new-password" style="padding-right: 36px;" />',
        '          <div class="field-group">\n'
        '            <div class="m3-field cvv-wrap">\n'
        '              <input type="text" id="f-cvv" class="m3-input" placeholder=" " maxlength="4" inputmode="numeric" autocomplete="new-password" style="padding-right:42px;" />\n'
        '              <label class="m3-label" for="f-cvv">CVV</label>'
    )
    # Close cvv-wrap outer div
    h = h.replace(
        '            </div>\n'
        '          </div>\n'
        '        </div>\n'
        '\n'
        '        <div class="field-group">\n'
        '          <label class="field-label">Nome no cartão</label>\n'
        '          <input type="text" id="f-cardname" placeholder="ALBERTO ROBERTO" autocomplete="new-password"\n'
        '            oninput="this.value = this.value.toUpperCase()" />\n'
        '        </div>\n'
        '\n'
        '        <div class="field-group">\n'
        '          <label class="field-label">Parcelamento</label>\n'
        '          <div class="installment-wrap" id="parc-wrap">',
        '            </div>\n'
        '          </div>\n'
        '        </div>\n'
        '\n'
        '        <div class="field-group">\n'
        '          <div class="m3-field">\n'
        '            <input type="text" id="f-cardname" class="m3-input" placeholder=" " autocomplete="new-password"\n'
        '              oninput="this.value = this.value.toUpperCase()" />\n'
        '            <label class="m3-label" for="f-cardname">Nome no cartão</label>\n'
        '          </div>\n'
        '        </div>\n'
        '\n'
        '        <div class="field-group">\n'
        '          <div class="m3-field m3-field--combo">\n'
        '          <div class="installment-wrap m3-combo-input" id="parc-wrap">'
    )
    # Close installment m3-field
    h = h.replace(
        '          </div>\n'
        '        </div>\n'
        '\n'
        '        <div class="btn-row" style="margin-top:4px;">',
        '          </div>\n'
        '          <label class="m3-label m3-label--float">Parcelamento</label>\n'
        '          </div>\n'
        '        </div>\n'
        '\n'
        '        <div class="btn-row" style="margin-top:4px;">'
    )

    # ── Receipt email ──
    h = h.replace(
        '        <input type="email" id="receipt-email" placeholder="seu@email.com" />',
        '        <div class="m3-field" style="flex:1;">\n'
        '          <input type="email" id="receipt-email" class="m3-input" placeholder=" " />\n'
        '          <label class="m3-label" for="receipt-email">seu@email.com</label>\n'
        '        </div>'
    )
    # Fix receipt-row to use flex properly (input is now wrapped)
    h = h.replace(
        '      <div class="receipt-row">\n'
        '        <div class="m3-field" style="flex:1;">',
        '      <div class="receipt-row">\n'
        '        <div class="m3-field" style="flex:1;">'
    )

    # ── Version switcher ──
    if is_pay:
        # v3-pay.html active on Pagar
        h = h.replace(
            '  <a href="v2-pay.html" class="vs-btn vs-active" title="V2 — Somente Pagamento" style="background:linear-gradient(135deg,#F5AF04,#FFC107);color:#273240;">V2</a>\n'
            '</nav>',
            '  <a href="v2-pay.html" class="vs-btn" title="V2 — Somente Pagamento">V2</a>\n'
            '  <div class="vs-divider" style="margin-top:6px;"></div>\n'
            '  <div class="vs-label">V3 / M3</div>\n'
            '  <a href="v3.html" class="vs-btn" title="V3 — Fluxo completo (Material Design 3)">V3</a>\n'
            '  <div class="vs-divider"></div>\n'
            '  <a href="v3-pay.html" class="vs-btn vs-active" title="V3 — Pagar (Material Design 3)" style="background:linear-gradient(135deg,#F5AF04,#FFC107);color:#273240;">Pagar</a>\n'
            '</nav>'
        )
    else:
        # v3.html active on V3 Completo
        h = h.replace(
            '  <a href="v2-pay.html" class="vs-btn" title="V2 — Somente Pagamento">V2</a>\n'
            '</nav>',
            '  <a href="v2-pay.html" class="vs-btn" title="V2 — Somente Pagamento">V2</a>\n'
            '  <div class="vs-divider" style="margin-top:6px;"></div>\n'
            '  <div class="vs-label">V3 / M3</div>\n'
            '  <a href="v3.html" class="vs-btn vs-active" title="V3 — Fluxo completo (Material Design 3)" style="background:linear-gradient(135deg,#F5AF04,#FFC107);color:#273240;">V3</a>\n'
            '  <div class="vs-divider"></div>\n'
            '  <a href="v3-pay.html" class="vs-btn" title="V3 — Pagar (Material Design 3)">Pagar</a>\n'
            '</nav>'
        )

    # ── Pay-file specific transformations (v2-pay.html indentation = 6 spaces) ──
    if is_pay:
        # Número do cartão (6-space indent)
        h = h.replace(
            '      <div class="field-group">\n'
            '        <label class="field-label">Número do cartão</label>\n'
            '        <div class="input-wrap">\n'
            '          <input type="text" id="f-cardnum" placeholder="0000 0000 0000 0000" maxlength="19" inputmode="numeric" autocomplete="new-password"\n'
            '            oninput="handleCardNumber(this)" style="padding-right: 48px;" />',
            '      <div class="field-group">\n'
            '        <div class="m3-field">\n'
            '          <input type="text" id="f-cardnum" class="m3-input" placeholder=" " maxlength="19" inputmode="numeric" autocomplete="new-password"\n'
            '            oninput="handleCardNumber(this)" style="padding-right:52px;" />\n'
            '          <label class="m3-label" for="f-cardnum">Número do cartão</label>'
        )
        # Close old input-wrap div for card number
        h = h.replace(
            '          </div>\n'
            '        </div>\n'
            '      </div>\n'
            '\n'
            '      <!-- Expiry + CVV -->',
            '        </div>\n'
            '      </div>\n'
            '\n'
            '      <!-- Expiry + CVV -->'
        )

        # Validade (8-space, inside field-row)
        h = h.replace(
            '        <div class="field-group">\n'
            '          <label class="field-label">Validade</label>\n'
            '          <input type="text" id="f-expiry" placeholder="MM/AA" maxlength="5" inputmode="numeric" autocomplete="new-password"\n'
            '            oninput="handleExpiry(this)" />\n'
            '        </div>',
            '        <div class="field-group">\n'
            '          <div class="m3-field">\n'
            '            <input type="text" id="f-expiry" class="m3-input" placeholder=" " maxlength="5" inputmode="numeric" autocomplete="new-password"\n'
            '              oninput="handleExpiry(this)" />\n'
            '            <label class="m3-label" for="f-expiry">Validade</label>\n'
            '          </div>\n'
            '        </div>'
        )

        # CVV (8-space, inside field-row)
        h = h.replace(
            '        <div class="field-group">\n'
            '          <label class="field-label">CVV</label>\n'
            '          <div class="cvv-wrap">\n'
            '            <input type="text" id="f-cvv" placeholder="123" maxlength="4" inputmode="numeric" autocomplete="new-password" style="padding-right: 36px;" />',
            '        <div class="field-group">\n'
            '          <div class="m3-field cvv-wrap">\n'
            '            <input type="text" id="f-cvv" class="m3-input" placeholder=" " maxlength="4" inputmode="numeric" autocomplete="new-password" style="padding-right:42px;" />\n'
            '            <label class="m3-label" for="f-cvv">CVV</label>'
        )
        # Close CVV cvv-wrap outer div
        h = h.replace(
            '          </div>\n'
            '        </div>\n'
            '      </div>\n'
            '\n'
            '      <!-- Card holder name -->\n'
            '      <div class="field-group">\n'
            '        <label class="field-label">Nome no cartão</label>\n'
            '        <input type="text" id="f-cardname" placeholder="ALBERTO ROBERTO" autocomplete="new-password"\n'
            '          oninput="this.value = this.value.toUpperCase()" />\n'
            '      </div>\n'
            '\n'
            '      <!-- Installments -->\n'
            '      <div class="field-group">\n'
            '        <label class="field-label">Parcelamento</label>\n'
            '        <div class="installment-wrap" id="parc-wrap">',
            '            </div>\n'
            '          </div>\n'
            '        </div>\n'
            '      </div>\n'
            '\n'
            '      <!-- Card holder name -->\n'
            '      <div class="field-group">\n'
            '        <div class="m3-field">\n'
            '          <input type="text" id="f-cardname" class="m3-input" placeholder=" " autocomplete="new-password"\n'
            '            oninput="this.value = this.value.toUpperCase()" />\n'
            '          <label class="m3-label" for="f-cardname">Nome no cartão</label>\n'
            '        </div>\n'
            '      </div>\n'
            '\n'
            '      <!-- Installments -->\n'
            '      <div class="field-group">\n'
            '        <div class="m3-field m3-field--combo">\n'
            '        <div class="installment-wrap m3-combo-input" id="parc-wrap">'
        )
        # Close parcelamento m3-field (pay)
        h = h.replace(
            '        </div>\n'
            '      </div>\n'
            '\n'
            '      <!-- Pay button -->',
            '        </div>\n'
            '        <label class="m3-label m3-label--float">Parcelamento</label>\n'
            '        </div>\n'
            '      </div>\n'
            '\n'
            '      <!-- Pay button -->'
        )

        # Receipt email (pay)
        h = h.replace(
            '      <div class="receipt-row">\n'
            '        <input type="email" id="receipt-email" placeholder="seu@email.com" />\n',
            '      <div class="receipt-row">\n'
            '        <div class="m3-field" style="flex:1;">\n'
            '          <input type="email" id="receipt-email" class="m3-input" placeholder=" " />\n'
            '          <label class="m3-label" for="receipt-email">seu@email.com</label>\n'
            '        </div>\n'
        )

        # Version switcher (pay)
        h = h.replace(
            '  <a href="v2-pay.html" class="vs-btn vs-active" title="V2 — Somente Pagamento">V2</a>\n'
            '</nav>',
            '  <a href="v2-pay.html" class="vs-btn" title="V2 — Somente Pagamento">V2</a>\n'
            '  <div class="vs-divider" style="margin-top:6px;"></div>\n'
            '  <div class="vs-label">V3 / M3</div>\n'
            '  <a href="v3.html" class="vs-btn" title="V3 — Fluxo completo (Material Design 3)">V3</a>\n'
            '  <div class="vs-divider"></div>\n'
            '  <a href="v3-pay.html" class="vs-btn vs-active" title="V3 — Pagar (Material Design 3)" style="background:linear-gradient(135deg,#F5AF04,#FFC107);color:#273240;">Pagar</a>\n'
            '</nav>'
        )

    with open(dst_file, 'w', encoding='utf-8') as f:
        f.write(h)

    return len(h)


# Run transformations
s1 = transform_v3(
    os.path.join(BASE, 'v2.html'),
    os.path.join(BASE, 'v3.html'),
    is_pay=False
)
print(f'v3.html written: {s1} chars')

s2 = transform_v3(
    os.path.join(BASE, 'v2-pay.html'),
    os.path.join(BASE, 'v3-pay.html'),
    is_pay=True
)
print(f'v3-pay.html written: {s2} chars')
