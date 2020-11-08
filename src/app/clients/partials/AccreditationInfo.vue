<template>
    <div>
        <a-descriptions title="Accredited Information">
            <a-descriptions-item span="9" v-if="user.type === 'Corporation'">
                <a-checkbox
                    :checked="user.accredited_investor_data.questionnaire.government_authority"
                    :disabled="disabled"
                >
                    A governmental authority or public statutory corporation constituted under any written law in
                    Jamaica, or company a majority of the voting shares of which are owned by the Government of Jamaica
                </a-checkbox>
                <br />
                <br />
                <a-checkbox
                    :checked="user.accredited_investor_data.questionnaire.financial_firm_under_specified_act"
                    :disabled="disabled"
                >
                    A bank as defined in the Banking Act, an insurance company registered under The Insurance Act, 2001,
                    a company licensed under the Financial Institutions Act or a building society registered under the
                    Building Societies Act.
                </a-checkbox>
                <br />
                <br />
                <a-checkbox
                    :checked="user.accredited_investor_data.questionnaire.approve_entity_under_specified_act"
                    :disabled="disabled"
                >
                    An approved retirement scheme, approved superannuation fund or specified pension fund, as defined in
                    The Pensions (Superannuation Funds and Retirement Schemes) Act, 2004
                </a-checkbox>
                <br />
                <br />
                <a-checkbox
                    :checked="user.accredited_investor_data.questionnaire.entity_register_with_commission"
                    :disabled="disabled"
                >
                    Any unit trust, mutual fund, non-redeemable investment fund or other collective investment scheme
                    that is registered with the Financial Services Commission (the “Commission”)
                </a-checkbox>
                <br />
                <br />
                <a-checkbox
                    :checked="user.accredited_investor_data.questionnaire.account_holder_is_accredited_investor"
                    :disabled="disabled"
                >
                    A trust company or licensed dealer purchasing as principal or on behalf of a fully-managed account
                    where the account holder is an accredited investor
                </a-checkbox>
                <br />
                <br />
                <a-checkbox
                    :checked="user.accredited_investor_data.questionnaire.net_assets_over_250_mil"
                    :disabled="disabled"
                >
                    An entity that had net assets in excess of 250 million Jamaican dollars as reflected in its audited
                    financial statements for its most recently completed fiscal year or alternatively, if its most
                    recently completed fiscal year ended less than 90 days prior to the relevant date, as reflected in
                    its audited financial statements for its second most recently completed fiscal year
                </a-checkbox>
                <br />
                <br />
                <a-checkbox
                    :checked="user.accredited_investor_data.questionnaire.entity_all_interest_are_accredited_investors"
                    :disabled="disabled"
                >
                    An entity in respect of which all of the owners of interests, direct or indirect or beneficial, are
                    accredited investors
                </a-checkbox>
                <br />
                <br />
                <a-checkbox
                    :checked="user.accredited_investor_data.questionnaire.qualifies_as_accredited_investor"
                    :disabled="disabled"
                >
                    An entity incorporated or constituted outside of Jamaica that is analogous to the entities listed in
                    paragraphs 1 to 5 under „Companies & Other Legal Entities‟ section or that qualifies as an
                    accredited investor or has a similar status however defined, under the securities legislation of its
                    governing jurisdiction
                </a-checkbox>
                <br />
                <br />
                <a-checkbox
                    :checked="user.accredited_investor_data.questionnaire.recognized_by_commission"
                    :disabled="disabled"
                >
                    An entity recognized as an accredited investor by the Commission
                </a-checkbox>
            </a-descriptions-item>

            <a-descriptions-item span="9" v-if="user.type === 'Individual'">
                <a-checkbox
                    :checked="user.accredited_investor_data.questionnaire.agents_of_issuer"
                    :disabled="disabled"
                >
                    An officer or general partner of the issuer, or any officer of a general partner of the issuer.
                </a-checkbox>
                <br />
                <br />
                <a-checkbox
                    :checked="user.accredited_investor_data.questionnaire.net_worth_over_50_mil"
                    :disabled="disabled"
                >
                    An individual whose net worth exceeds 50 million Jamaican dollars, or a corporation over 90% of the
                    voting shares of which are owned by such an individual or a trust of which such an individual is the
                    sole primary beneficiary.
                </a-checkbox>
                <br />
                <br />
                <a-checkbox
                    :checked="user.accredited_investor_data.questionnaire.income_over_10_mil_after_tax"
                    :disabled="disabled"
                >
                    An individual who had an income before taxes in excess of 10 million Jamaican dollars in each of the
                    two most recent calendar years, or a corporation over 90% of the voting shares of which are owned by
                    such an individual or a trust of which such an individual is the sole primary beneficiary.
                </a-checkbox>
                <br />
                <br />
                <a-checkbox
                    :checked="
                        user.accredited_investor_data.questionnaire.individual_outside_country_qualifies_as_investor
                    "
                    :disabled="disabled"
                >
                    An individual residing outside of Jamaica who qualifies as an accredited investor (however defined)
                    or has a similar status, under the securities legislation of the individual‟s country of residence,
                    or who meets the criteria specified in paragraph (g) or (h) and is otherwise lawfully entitled to
                    purchase the securities under the securities laws applicable to such purchase.
                </a-checkbox>
                <br />
                <br />
                <a-checkbox
                    :checked="user.accredited_investor_data.questionnaire.recognized_by_commission"
                    :disabled="disabled"
                >
                    An individual recognized as an accredited investor by the Commission.
                </a-checkbox>
            </a-descriptions-item>
        </a-descriptions>

        <a-row v-if="user.type === 'Individual'">
            <a-col :span="12">
                <a-descriptions title="Assets">
                    <a-descriptions-item label="Cash" span="3">
                        {{ user.accredited_investor_data.questionnaire.asset_cash }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Investment" span="3">
                        {{ user.accredited_investor_data.questionnaire.asset_investments }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Life Insurance" span="3">
                        {{ user.accredited_investor_data.questionnaire.asset_life_insurance }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Personal Properties" span="3">
                        {{ user.accredited_investor_data.questionnaire.asset_personal_property }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Real Estate" span="3">
                        {{ user.accredited_investor_data.questionnaire.asset_real_estate }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Retirement Funds" span="3">
                        {{ user.accredited_investor_data.questionnaire.asset_retirement_funds }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Securities" span="3">
                        {{ user.accredited_investor_data.questionnaire.asset_securities }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Others" span="3">
                        {{ user.accredited_investor_data.questionnaire.asset_others }}
                    </a-descriptions-item>
                </a-descriptions>
            </a-col>
            <a-col :span="12">
                <a-descriptions title="Liabilities">
                    <a-descriptions-item label="Debt" span="3">
                        {{ user.accredited_investor_data.questionnaire.liability_debt }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Real Estate" span="3">
                        {{ user.accredited_investor_data.questionnaire.liability_real_estate }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Others" span="3">
                        {{ user.accredited_investor_data.questionnaire.liability_others }}
                    </a-descriptions-item>
                </a-descriptions>
            </a-col>
            <a-col :span="24">
                <strong>Total Assets:</strong> {{ user.total_assets }} <br />
                <strong>Total Liabilities:</strong> {{ user.total_liabilities }}<br />
                <strong>Estimated Net Worth</strong> {{ user.total_assets - user.total_liabilities }}
            </a-col>
        </a-row>
    </div>
</template>

<script>
export default {
    props: {
        user: {},
    },
}
</script>
