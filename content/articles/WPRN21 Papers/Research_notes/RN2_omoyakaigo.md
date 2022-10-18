---
DOI: 10.5072/zenodo.1115409
Zid: 1115409
abstract: >-
  The purpose of this study is to examine the way mediated content about the
  novel coronavirus (COVID-19) outbreak fluctuated in the Japanese information
  environment from January – April 2020. This will be made possible through
  collecting data and making comparisons of the topics that were prevalent in
  traditional media and social media before and after the pandemic declaration
  by the WHO. As early as February 2020, the WHO has been labelling this
  outbreak as a dangerous infodemic therefore this study aims at providing
  analysis results that will concisely present an accurate and objective view of
  the types of topics in traditional and social media. This study hopes to also
  present analysis results that can provide governments with new insight on
  resolving the discontent towards lack of information and suspicion among
  citizens.
article_title: >-
  Dissatisfaction and alternative information in the early stages of the
  Covid-19 pandemic: Comparing contents in Japanese newspapers with Twitter
authors:
  - firstname: Yuka
    lastname: Omoya
    picture: ''
    picture_copyright: ''
    reference: ''
    social_channels:
      google_scholar: ''
      instagram: ''
      linkedin: ''
      mendeley: ''
      orcid: ''
      researchgate: https://www.researchgate.net/profile/Yuka-Omoya
      twitter: ''
      website: ''
      wikipedia: ''
    titles_and_positions:
      - institution: >-
          Graduate School of Humanities and Social Sciences, University of
          Tsukuba, Japan
        titles: []
  - firstname: Muneo
    lastname: Kaigo
    picture: ''
    picture_copyright: ''
    reference: ''
    social_channels:
      google_scholar: ''
      instagram: ''
      linkedin: ''
      mendeley: ''
      orcid: ''
      researchgate: ''
      twitter: ''
      website: ''
      wikipedia: ''
    titles_and_positions:
      - institution: >-
          Faculty of Humanities and Social Sciences, University of Tsukuba,
          Japan
        titles: []
bibliography: /bibliography/documents-exportes_rn2.bib
custom_pdf: ''
date: 2022-04-11T13:53:04.000Z
disciplines: ''
doi: '169059797'
highlight: false
issue: content/issues/WPRN21 Proceedings.md
keywords:
  - Newspapers
  - Twitter
  - Topicmodels
  - Infodemic
  - COVID-19
language: English
picture: ''
picture_copyright: ''
published: true
title: RN2_OmoyaKaigo
yt: ''

---

## 1. INTRODUCTION

Accompanying the COVID-19 outbreak and lack of accurate information related to this virus, many sources of information were providing various stories or topics in Japan. At the early stage of the outbreak people were aggressively seeking new information because of the uncertainty about the virus. This was creating anxiety and building further suspicion and fear. With so many different channels of information available in the current world, one is less likely to be dependent on a single source of information.

From previous studies (@kaigo_social_2012; @mishima_public_2010), our assumptions were: topics that were relevant to governmental issues were more often found in mass media, rather than social media and topics that were relevant to families and individuals were more often found in social media, rather than mass media. Therefore, this study investigated how the topics of information regarding COVID-19 in traditional and social media differed and how the topics in relation to COVID-19 of traditional and social media users changed before and after the WHO pandemic declaration in 2020 (@world_health_organization_novel_2020).

## 2. PURPOSE OF THE STUDY

This study examines how mediated content about the COVID-19 outbreak fluctuated in the Japanese information environment during January– April 2020. The study aims to illustrate how essential information about COVID-19 was scarce in the early stages of the pandemic in both Japanese newspapers and Twitter through determining dominant topics. This study also examines how anxiety towards COVID-19 rose among the public during a time of uncertainty.

RQ1: How do the topics of information regarding COVID-19 in newspapers and Twitter differ?

RQ2: How did the topics in relation to COVID-19 of newspapers and Twitter users change before and after the WHO pandemic declaration?

## 3. METHODOLOGY

Newspaper articles were collected from the Asahi, Yomiuri, and Mainichi Shimbun. For the analysis of the social media discourse about the coronavirus, this study collected Twitter data from the Twitter Application Program Interface (API). This study extracted the tweets with the hashtag “#koronauirusu (coronavirus)” at seven-day intervals from February 6, 2020, to April 10, 2020. The term “coronavirus” is commonly used than “COVID-19” in Japan, so to avoid redundant data collection, this study employed data collection using this hashtag to avoid overlapping duplication of data.

![](/capturern11.PNG)

Table 1 describes the number of newspaper articles and Twitter tweets collected for this study. For the analysis, this study used R statistical analysis software.

For text mining, the quantitative analysis of textual data package (quanteda) was used for creating a corpus and this study employed topic modelling for automatic coding of content (@benoit_quanteda:_2018; @catalinac_quantitative_2019).

## 4. SUMMARY OF RESULTS

The research results found that the reporting policies requiring verifiable facts by mass media organizations, in result were hindering the timely provision of information that was most needed by the public during the initial stages of the COVID-19 pandemic in Japan.

![](/capturern12.PNG)

During the same time, information exchange on Twitter was procuring a complex array of information, with rumors and fake news accompanying verified facts in the early stages of the pandemic.

![](/capturern13.PNG)

## 5. DISCUSSION

This study formulated two research questions. Regarding RQ1 (How do the topics of information regarding COVID-19 in newspapers and Twitter differ?) and RQ2 (How did the topics in relation to COVID-19 of newspapers and Twitter users change before and after the WHO pandemic declaration?); one can observe through Table 2, newspapers focused on international topics such as China, U.S. and Europe and official topics that involved the government such as the suspension of primary and secondary schools, the economy, and the postponement of the Tokyo Olympic games and cancellation of other events. As one can observe in Table 3, Twitter tweets focused more on topics that affect individual or household needs such as medical issues and financial well-being of individuals and families, along with rumors or misinformation due to uncertainty of the situation. Tweets expressing fear towards the inadequacy of the Japanese medical system and fear of not being able to receive sufficient medical attention in Japan were prevalent.

![](/capturern14.PNG)

Outside of the manifest objective of this study (examining the way mediated content about the COVID-19 outbreak fluctuated in the Japanese information environment), a more latent aim of this study is to provide a perspective for policymakers in the future, when another epidemic is on the rise so that they will be able to improve and alter the flow of information and topics that appear on traditional and social media so nations and citizens can be better prepared during the unfolding of another crisis. Policymakers and institutions can reanalyze the results from this study, and plan for a better action plan. This study shows the development of the variety of topics that were salient in traditional and social media during the months prior to the drastic change in human social behavior that had a large economic and psychological effect on many nations and citizens around the globe.

One underlying phenomenon inherent in this study background is the social discontent towards the information being provided by the government, institutions, and mass media. The topics discovered on social media might provide new and useful insight into the information that was being sought by ordinary citizens.

## ACKNOWLEDGEMENTS

This study received funding from the University of Tsukuba (2020 Program to Apply the Wisdom of the University to tackle COVID -19 Related Emergency Problems) and the Central Research Institute for Electric Power Industry for facilitating contractual newspaper data usage fees to uphold copyrights. Detailed findings of this study will be published as a chapter in the forthcoming book _Global Pandemics and Media Ethics_ (edited by Tendai Chari and Martin Ndlela)