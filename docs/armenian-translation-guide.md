# Armenian translation guide (Western Armenian)

The Armenian version of the UAECNE site is in **Western Armenian as written in Lebanon**, in
**classical (Mashtots) orthography**, the way the Union, its churches and the Lebanese-Armenian
press write it. Never Eastern Armenian, never reformed spelling.

Every English text on the site is translated by hand, by meaning, keeping the English facts
exactly (names, numbers, dates, places). Nothing is added, dropped or "improved".

The dictionary is `src/i18n/hy.json` (English text → Armenian). Edits made in
Admin › Translations are stored in the database and override the file.

## 1. Spelling (classical orthography)

| Write | Not | Example |
| --- | --- | --- |
| -ութիւն / -ութեան | -ություն / -ության | Միութիւն, Միութեան |
| -եան (surnames, adjectives) | -յան | Հայկազեան, Չոլաքեան |
| եւ | և (ligature) | Լիբանան եւ Սուրիա |
| իւ, ու where classical | յու | Միութիւն, իւրաքանչիւր |
| -ոյ / -ւոյ genitive | -ի | եկեղեցւոյ, Աստուծոյ |
| Յ- at the start where classical | Հ- | Յունիս, Յովհաննէս, Յունաստան |
| է where classical | ե | Պէյրութ, Հալէպ, մէջ, թէ, ինչպէս |
| օ where classical | ո | Օգոստոս, Տնօրէն |

## 2. Grammar and words (Western, not Eastern)

| Western | Eastern (never) |
| --- | --- |
| կը + verb (present): կը ծառայէ | ծառայում է |
| պիտի + verb (future) | կծառայի / ծառայելու է |
| ...ին մէջ (in) | -ում |
| ան, անոնք (he/she, they) | նա, նրանք |
| ասիկա, այս | սա |
| որ (which) | որը |
| ալ (also) | էլ |
| ետք (after) | հետո |
| հիմա, այժմ | հիմա (fine), but not Eastern word order |
| -էն (from): Պէյրութէն | -ից |
| -ով, -ու, -ի case endings as in Western grammar | |

Prefer the natural Lebanese-Armenian phrasing over a word-for-word copy of the English.

## 3. Titles and honorifics

| English | Armenian |
| --- | --- |
| Rev. | Վեր. |
| Rev. Dr. | Վեր. Դոկտ. |
| Dr. | Դոկտ. |
| Prof. | Փրոֆ. |
| Mr. | Պրն. |
| Mrs. | Տիկ. |
| Ms. / Miss | Օրդ. |
| Pastor (as a title before a name) | Պատ. |

Women's roles take the feminine form when the person is a woman: Տնօրէնուհի, Ատենապետուհի.
Men: Տնօրէն, Ատենապետ.

## 4. Names of people

Transliterate by **Western Armenian pronunciation** (բ=p, պ=b, գ=k, կ=g, դ=t, տ=d, ճ=j, ջ=ch,
ծ=dz, ձ=ts) and classical spelling: Karagoezian → Գարակէօզեան, Sabounji → Սապունճի,
Haidostian → Հայտօսթեան, Cholakian → Չոլաքեան. When a person already appears in the
dictionary, always reuse that exact spelling. If a spelling is uncertain, list it in the review
notes for a person to confirm.

## 5. Fixed terms

| English | Armenian |
| --- | --- |
| Union of the Armenian Evangelical Churches in the Near East | Մերձաւոր Արեւելքի Հայ Աւետարանական Եկեղեցիներու Միութիւն |
| UAECNE (in Armenian text) | ՄԱՀԱԵՄ |
| Armenian Evangelical Church | Հայ Աւետարանական Եկեղեցի |
| Central Committee | Կեդրոնական Վարչութիւն |
| General Assembly | Ընդհանուր Ժողով |
| Acting President | Նախագահի Պաշտօնակատար |
| President | Նախագահ |
| Chair / Chairman | Ատենապետ |
| Vice-Chairman (churches) | Փոխ Ատենապետ |
| Chair of Council (schools) | Խորհուրդի Ատենապետ |
| Secretary | Քարտուղար |
| Clerk | Ատենադպիր |
| Treasurer | Գանձապահ |
| Member at Large | Խորհրդական |
| Ex Officio | Պաշտօնի բերումով |
| Pastor (role) | Հովիւ |
| Principal | Տնօրէն / Տնօրէնուհի |
| Educational Council | Կրթական Խորհուրդ |
| Christian Endeavor (CE) | Քրիստոնէական Ջանադիր (Ք.Ջ.) |
| Sunday School | Կիրակնօրեայ Դպրոց |
| Women's Auxiliary | Տիկնանց Օժանդակ Մարմին |
| Boarding Home | Գիշերօթիկ |
| Camps | Բանակումներ |
| Outreach | Հասարակական ծառայութիւն |
| Ministries | Ծառայութիւններ |
| Partnerships | Գործընկերութիւններ |
| Memberships | Անդամակցութիւններ |
| Resource Center | Տեղեկատու կեդրոն |
| Headquarters | Կեդրոնատեղի |
| Haigazian University | Հայկազեան Համալսարան |
| Near East School of Theology (NEST) | Մերձաւոր Արեւելքի Աստուածաբանական Ճեմարան |
| Kindergarten / Elementary / Intermediate / Secondary | Մանկապարտէզ / Նախակրթարան / Միջնակարգ / Երկրորդական |

Places: Պէյրութ, Լիբանան, Սուրիա, Հալէպ, Դամասկոս, Այնճար, Քեսապ, Պուրճ Համուտ, Աշրաֆիէ,
Պոլիս (Istanbul), Յունաստան, Աթէնք, Սալոնիկ (Thessaloniki), Աւստրալիա, Սիտնի.

Months: Յունուար, Փետրուար, Մարտ, Ապրիլ, Մայիս, Յունիս, Յուլիս, Օգոստոս, Սեպտեմբեր,
Հոկտեմբեր, Նոյեմբեր, Դեկտեմբեր. Dates: 21–22 Յունիս 2026.

## 6. Punctuation

- Full stop: ։ (not :). Question: ՞ on the stressed word. Emphasis/exclamation: ՛ or ։
- "but / that is" pause: ՝
- Quotation marks: « »
- Elision apostrophe: ՚ (U+055A), e.g. կ՚ընդգրկէ, մ՚
- Keep times (10:30), numbers, URLs, emails and phone numbers exactly as in English.

## 7. Bible verses

Use the wording of the Western Armenian Bible used by Armenian Evangelicals when certain of it;
otherwise translate faithfully and flag the verse for a person to check against the printed Bible.
References: Սաղմոս 18:2, Մատթէոս 18:20 (book names in Western spelling).

## 8. Never translate

Email addresses, URLs, phone and fax numbers, social network names (Facebook, YouTube,
Instagram, X), the English address column in the footer (the Armenian column beside it is the
translation), and code-like values.

## 9. Before finishing a page

- No English left on the page except the items in section 8.
- Every repeated term matches this guide and earlier pages.
- No Eastern forms: ություն, -յան, և, -ում, էլ, հետո, նա/նրանք, որը, -ից.
