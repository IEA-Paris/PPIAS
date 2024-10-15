---
published: false
article_title: Artificial intelligence at work in the legal profession
date: 2024-10-15T09:14:00.000Z
type: article
needDOI: false
authors:
  - is_institution: false
    firstname: "Henrik "
    lastname: Palmer Olsen
    positions_and_institutions: []
    social_channels:
      website: ""
      wikipedia: ""
      orcid: ""
      linkedin: ""
      webstwitterite: ""
      google_scholar: ""
      researchgate: ""
      mendeley: ""
  - is_institution: false
    firstname: "Casper "
    lastname: Laursen
    positions_and_institutions:
      - institution: Pandektes
        positions:
          - Global Media and Communications
    social_channels:
      website: ""
      wikipedia: ""
      orcid: ""
      linkedin: ""
      webstwitterite: ""
      google_scholar: ""
      researchgate: ""
      mendeley: ""
abstract: "              "
issue: content/issues/paris-ias-ideas.md
highlight: false
bibliography: /static/references-palmerolsen-larsen.bib
language: English
---
## 1. Artificial intelligence in a legal context: an introduction

It is not a new observation that artificial intelligence technology has developed significantly in recent years, nor that this technology has the potential to support legal work. International research into artificial intelligence applied in the context of tasks performed by the legal profession has also been on the rise[^1], and so has the number of so-called legal tech companies providing artificial intelligence technology to the legal profession[^2]. In this article, we briefly describe how the more recent developments in artificial technology (Machine Learning and Large Language Models) function and how this technology can be used in various ways to support the work of legal professionals. We do not discuss the regulatory framework around this usage (GDPR, AI Act, administrative law, etc.), but concentrate on explaining the possible usages that the technology offers.

The idea of automated application of law is not new. At least since the 1970s, research has been conducted on how legal rules and their application can be automated. Based on input from legal experts, attempts have been made to encode rules in computer programs, which then produce a legal output (a decision or recommendation) based on a given factual input[^3]. This research is still ongoing and automation is also used in practice. Examples from Denmark include the Danish digital land registry, where users enter relevant information into the system, which then generates a land registry certification based on the information entered[^4]; the Danish Agency for Science, Technology and Higher Education, where the processing of applications for state education grants is highly automated[^5]; the preparation of annual tax returns by the Danish Tax Agency, which is also carried out as an automated process[^6]. These automated decision-systems are all build as symbolic logic systems using conventional programming techniques (manual hand coding).

In recent years, however, another approach to automation, artificial intelligence in the form of machine learning (ML), has received a lot of attention. Unlike the logical systems described above, ML is based on mathematical functions generated on large data sets.

Logical systems work *from the top down*: the system is coded manually in a build-up phase and then deployed. In contrast, machine learning works *from the bottom up*: a large amount of data is fed into a computer program. The program then searches for connections between different parts of the data. This creates mathematical models that can be used to analyze new data. While ML may be performed on the basis of manual instructions (in supervised machine learning), its internal mathematical model is machine generated. The main difference between ML systems and logical systems, then, is that ML systems are machine-generated while logical systems are manually coded by humans. Our focus in this article is on ML.

With an ever-growing body of legislation and case law (administrative as well as judicial), and the resulting increased complexity of the legal system, there is a growing focus on how artificial intelligence can support case management in both private and public sectors. But complexity and caseloads are just one challenge -- another challenge is a general increase in pressure on the overall public economy. For this reason, many government leaders in Europe see artificial intelligence as part of the solution to the challenge of having sufficient resources available for the tasks that must be carried out in a modern state. Similarly, the private sector is also focused on controlling costs, which leads businesses, including legal service providers, to increasingly test and implement artificial intelligence systems in their business[^7].

However, as artificial intelligence develops and gains ground in all parts of society, there is also widespread concern that the use of this technology can cause harm to our society, including the justice system. As a result, a number of regulatory initiatives have been taken to protect the rights of citizens. In this article, however, we limit ourselves to focusing solely on the potential of using artificial intelligence to support different types of tasks currently performed by the legal profession. Our purpose is to provide an introduction to the technology (with a special focus on ML) and to illustrate the types of legal work that can be supported with this technology. Our starting point is that the implementation of artificial intelligence to support legal is still relatively limited. We therefore believe that there is a potential for further use of artificial intelligence in the legal profession and that this potential will be released in the coming years.

In section 2 below, we provide a brief introduction to the technologies that fall under the umbrella term "artificial intelligence" and in the following sections 3-5 we zoom in on ML and briefly describe how this technology works. Then, in sections 6-8, we will give examples of how different types of ML technology can support fact elucidation (6), legal information retrieval and analysis (7) and legal inference (8). Section 9 contains a short conclusion.

The application of artificial intelligence technology in the legal field is of course subject to the restrictions imposed by applicable law. It is not the purpose - nor is it possible within the scope of this article - to provide a legal analysis of these restrictions. Whether a given use of AI is lawful or ethically responsible will largely depend on a concrete assessment of what data is used, how it is used, for what purpose, in what context, etc. Instead, we refer to the general introductory literature in the field. Our focus in the following is thus solely to illustrate the interaction between technology and legal work by showing how artificial intelligence can be incorporated into the case handling procedures used in different types of legal work.

## 2. Artificial intelligence technologies and how they work

There is no firmly established definition of artificial intelligence. However, an Artificial Intelligence Regulation has recently been adopted in the EU[^8], which contains a legal definition of the concept in art. 3, 1):

> "'AI system' means a machine-based system designed to operate with varying levels of autonomy, that may exhibit adaptiveness after deployment and that, for explicit or implicit objectives, infers, from the input it receives, how to generate outputs such as predictions, content, recommendations, or decisions that can influence physical or virtual environments."

What distinguishes a traditional software system from an AI system is that an AI system has machine autonomy, which allows the system to process a given input in order to infer an output in the form of a categorization. Traditional software, such as a calculator, excel sheet or word processing system, can perform automatic functions based on locked logical relationships between input and output. These traditional functions do not exert autonomy because the output is already encoded with the input. An AI system with machine autonomy, on the other hand, is characterised by processing input variables through a series of mathematical functions that the machine itself has generated.

In relation to the definition in the Artificial Intelligence Regulation, it is not entirely clear whether any form of ML should be classified as artificial intelligence. Some ML models are locked once they are fully trained. These models are more like traditional automation, but with the difference that the learning process (the coding of the model) is more complex and sometimes opaque because it is a machine program that codes the model. Other forms of ML exhibit true autonomy. For example, ML using so-called deep neural networks. These models contain multiple layers of probability functions that are activated by an input. Because the model operates probability functions, it often does not generate the exact same output on a given input. This technology is used in, for example, the large language models that have attracted a lot of attention in recent years. ML using reinforcement learning also has an element of autonomy because the underlying parameters that convert input to output change as the model receives feedback from a user (see below).

As mentioned, in this article we focus solely on ML. The hallmark of ML is that it is a computer program that, through training on data, creates a model that is then used to process new data and create output from it, e.g. in the form of a classification. For example, a model can be used to classify criminal convictions according to whether they impose a suspended or unconditional prison sentence. Another example would be to classify tax deduction decisions into approved and unapproved deductions. Any relationship between input data and output can be modelled in this way, provided that the data is available in a digitally readable format.

One could collect a dataset consisting of, for example, all criminal convictions handed down by the courts over, say, the last 10 years... The dataset is then divided into three parts: a training set (e.g. 80%), a validation set (e.g. 10%) and a test set (e.g. 10%). The training set, as the name suggests, is used to train the ML model - i.e. to gain knowledge about which data points can best predict the output that the model is supposed to provide[^9]. In the training phase, an algorithm searches through the data to find the statistically most common correlations between different parts of the data, e.g. between case facts and judgment outcomes. The validation set is then used to optimize the model by fine-tuning the learned parameters. Finally, the model is tested in order to gain knowledge about the model's accuracy - i.e. how good the model is at making the desired classification.

If the model works well, it will be able to find the right outcome in up to 90% of cases. Various experiments have been conducted where artificial intelligence competes against human lawyers in such classification tasks. Artificial intelligence is not only consistently faster but also more accurate when it comes to solving many similar routine tasks of this kind[^10].

After training, validation and testing, the model may be deployed. Here it is important to carefully consider how deployment should take place. In many cases, it will be obvious to use the model as a recommendation system for new cases. This will work by uploading case information from the new case to the system, which then, based on the model, produces an output in the form of a proposal for which outcome best fits the input information.

It is important to note that the "recommendation" is a mathematical calculation based on statistical correlations between case information and verdict outcomes in historical cases. ML is characterized by the fact that the relationship between input and output is based on a mathematical function and not on cognitive reasoning. This is something to be particularly aware of when using ML in a legal context. A "recommendation" from an ML-based system is not the same as a recommendation from a colleague - it is something very different: It is the result of a mathematical calculation over a large amount of data that is not linked to judgment based on experience or reasoning, but to a very large number of (often unknown) data points that are given a numerical value in a software system. Furthermore, it is important to note that it can be difficult - sometimes impossible - to know exactly which case information is included in the model's calculations. It may be the combination of individual word parts that do not necessarily make sense to a lawyer, but are statistically strongly related to a certain outcome.

A software system "recognizing" a pattern in a collection of court decisions is not the same as a lawyer recognizing a pattern in the same data. In tort litigation, a lawyer might see a pattern in the assessment of liability, which the lawyer might describe as a limitation of liability due to a lack of foreseeability. An ML model (e.g. a large language model) will simply "see" a configuration of words (expressed in vectors) in the different documents and will group the documents where the configurations are more similar than the other documents. The ML model can "read much faster" and can group together documents with the same mathematical-linguistic profile, but it cannot *understand the* meaning of the words or documents in the same way humans can[^11]. Therefore, the ML model's grouping of cases will not necessarily be similar to the grouping that a lawyer would make if the lawyer had to put together a series of judgments about, for example, foreseeability in torts. The advantages of the ML model are that it is faster, that it "reads" all the documents, and that it does not forget information during the processing of data. In this way, it can act as a form of coarse data (document) sorting, which the lawyer can then validate and fine-sort. However, it is important that the lawyer is aware that the ML model will often generate both false positives (in this example: judgments that are not about foreseeability) and false negatives (in this example: rejecting judgments that are about foreseeability).

For legal professionals, understanding how these technologies operate and how their use can affect their work is of increasing importance[^12]. There is little doubt that AI technology will continue to be incorporated into new IT tools that can rationalize many different legal tasks. We can already observe this development in very commonly used IT systems. Microsoft is currently rolling out artificial intelligence in the form of a GPT model in its software packages (including the frequently used programs Word and Edge)[^13]. This is a development we expect will also affect the development of more specialized IT systems, e.g. case management systems etc. The ability to use this technology in a productive and safe manner will eventually become a competitive parameter that will affect the working life of many lawyers[^14].

In the following (sections 3-5), we will explain three different technical approaches to ML, and for each of these approaches, we will give a few brief examples of how artificial intelligence could be used in a legal context. The examples will be elaborated in sections 6-8 below.

## 3. Supervised ML and use of classification techniques

In supervised ML, a model is trained using a labelled dataset, which means that humans (domain experts) have labelled/categorized (some of) the data points in a sample of the overall dataset. This labelling serves as an instruction to the algorithm: "Learn to recognize this kind of data". The model is then trained to look for similar patterns in new data by observing similarities and differences related to labelled categories. This allows the model to make calculations to identify the likelihood of new data belonging to a particular class.

This approach can be useful in the context of e.g. business transfers, where the acquiring company needs to assess the value of the contracts that the acquired company is involved in at the time of acquisition. An AI system that can read and highlight certain types of rights and obligations in a large contract portfolio and identify information such as deadlines, rights of first refusal, rights of use, etc. can be a supporting tool for law firms performing due diligence tasks[^15].

Another application area is to use classification to perform anonymization and pseudonymization of documents and other data sources through the use of Named-Entity Recognition (NER). NER works by tagging proper names in texts and making a model recognize proper names in new documents. This automates pseudonymization and anonymization tasks, which is of great practical importance when processing requests for access to documents from public agencies through access to information rights and when publishing decision-making practices that must be kept anonymous.

In criminal law, it might be relevant to classify judgments according to whether a conditional or an unconditional sentence has been handed down in the case. A similar application could be a division of criminal convictions into categories where 1) mitigating circumstances are included in the sentencing and 2) where no mitigating circumstances are included in the sentencing. Furthermore, the character of mitigating circumstances could be relevant information for practising criminal lawyers. When using supervised learning, one would need to first mark up the dataset (in this case identifying mitigating circumstances) on a part of the dataset and then train a model to look for patterns that can be seen as signs that a case belongs to the group of cases where there are mitigating circumstances. This is followed by validation and testing, as mentioned above in section 2. In this way, a model is trained to identify the information in the cases that are related to mitigating circumstances (as defined in the mark-up of the dataset) and this information can then be used to build arguments in for or against the presence of mitigating circumstances in the new cases. Both defense lawyers and prosecutors as well as judges can benefit from having access to such a system.

As existing ML models continue to improve, automated text tagging can be implemented. A model can be used to recognize certain parts of text and then tag these parts. Once tagging has finished, it will be possible to train a new model, using the tags as enriched training data. This way, very large dataset can be tagged, something that would otherwise require many hours of manual work. Using automated tagging can enrich the dataset and increase the quality of the classification and recommendation tasks performed by the model trained on this enriched data.

## 4. Unsupervised learning and the use of pattern recognition

Another type of ML is based on unsupervised learning. This means that an algorithm is trained to identify patterns and relationships in data without receiving any instruction, i.e. without the use of a labelled dataset. In unsupervised learning models, the algorithm is tasked with exploring and analyzing large amounts of data to identify groupings or patterns in the dataset, but unlike supervised learning, training data is not labelled. There can be two reasons for not tagging data. Firstly, domain experts' time is usually expensive. If there is an assumption that an unsupervised algorithm will be able to find the sought after patterns in the data without using supervision, then it will be possible to create a useful model using fewer resources. Secondly, labelling does not always give the best result. Unsupervised learning can be conducted more freely, which sometimes produces better results than learning on datasets labelled by domain experts. Experts often process their knowledge in systems of thought that are logical to humans, but there may be variance hidden in larger datasets that can be significant without the expert realizing it.

The purpose of unsupervised learning is to enable the identification of undiscovered patterns and structures in data that can lead to new insights. Such new insights in the data can also form the basis for subsequent (automated) labelling and thus the application of supervised learning, which we introduced above. It is our expectation that unsupervised learning will be of great importance, especially in legal information retrieval. The so-called Large Language Models (LLMs) will be particularly suitable for this type of task. An example of this is case law search, where the models can be used to find decisions concerning the same legal issue, e.g. by recognizing similarities in facts or legal reasoning, etc[^16].

A particular challenge associated with the use of unsupervised learning models is the quality of datasets, including incomplete datasets. Such datasets can provide an incomplete or skewed picture of the overall real world, limiting the model's ability to create an accurate analysis and thus affecting its ability to produce an output of sufficient quality. But this is not the only problem with unsupervised learning. Another problem is that it can be difficult for a model to distinguish between essential and non-essential data without having a labelled dataset. In ML, all data has the same value unless it is labelled (in which case it is supervised learning). Therefore, if some data is more important than others, it can be difficult to get good results with unsupervised learning.

However, sometimes so-called metadata (data about data) can be a substitute for labelling data. In areas where there are complete and accessible sources with associated metadata, such as legislative text (supplemented with metadata in the form of bill numbering, date of enactment, responsible ministry for introducing the bill, etc.) or EU case law (with metadata such as which treaty provisions and previous judgments are referred to in the judgments), unsupervised ML will be particularly suitable. This is because the sources are well-established and authorized and the data quality is consistently high. With the help of unsupervised learning, it will be possible to conduct comprehensive and in-depth searches in the increasing amount of legal text in much less time than through manual searches of the Official Journal of the European Union and the back catalogue of white papers etc. In addition, one could potentially find relevant legislation that one would not be found by doing a manual information search only.

Unsupervised ML could also be used experimentally to seek out patterns in data that legal professionals have not previously identified and therefore have not been able to analyze and interpret. Unsupervised ML then, may help to promote new legal research and to analyze entire fields of law, compare municipal practices, etc. In general, unsupervised learning can help legal professionals organize, analyze, and extract valuable insights from complex legal data, benefiting both individual lawyers and the legal system as a whole.

## 5. Reinforcement learning and automated text generation.

The third type of ML we will review is basically created through supervised or unsupervised training, and is subsequently set up to generate output that can form the basis for decisions. The additional component in reinfocement learning is that models of this type work by having continuous interaction with a training environment and a feedback system. Unlike both supervised and unsupervised ML, which both generate static models (although Deep Neural Networks can sometimes process the same input in different ways), reinforcement learning is dynamic in that the system's output generates a reaction, which then forms a new input to the ML model itself. The underlying model that creates output based on the input thus changes continuously as the system is used.

In reinforcement learning, an algorithm is initially trained by being presented with a data set (labelled or not) to learn relationships between data points in the set. The observed correspondence in a data set between, for example, point A and point B, is then used as a system to observe new data points where data A is available but data B is missing. After analyzing A, the system will then produce an output in the form of a suggestion for which B will fit A. The algorithm is then trained with feedback from an external metric (it could be feedback from a human user (typically a domain expert)) who can give some form of points to the output (B) presented to them by the AI system. Positive and negative feedback (points) are then loaded back into the algorithm, which then adjusts the underlying parameters I the model. The purpose is to optimize the model's ability to predict the correct (B) from the inputted (A).

The biggest impact of AI on legal work over the next few years will come from text-producing language models. That is, systems that can produce new original text based on artificial intelligence - e.g. an answer to (part of) an exam paper, a legal memo (or parts thereof), a draft of a contract or will, etc. The ability of language models to produce text is based on computer programs that can process natural (human) language so that it becomes possible to interact with the computer program directly through ordinary language use. In order to achieve this, a computer program needs to be trained on a very large amount of text. A well-known example of a large language model is Open AI's model GPT-4 (GPT stands for Generative Pre-trained Transformer), which is estimated to be trained on a text volume corresponding to several billion words and containing up to 1 trillion different parameters (weights that determine the relationship between the different word parts in the model). A GPT can be used to generate original new text through a so-called prompt.

A GPT is, as the name suggests, pre-trained. This means that it is a generic model that can generate text on any topic. The model uses the input provided by the prompt to calculate the text that best matches the input.

The text output generated is a result of the (often very extensive) training that underpins the model. This also means that GPTs do not perform particularly well in areas that have not been represented in the training set, or where words are used in ways that are different from everyday language. In addition, GPTs can "hallucinate". This means that GPTs can produce output that contains claims or references that are fabricated and therefore false[^17]. For example, a GPT that is prompted to reference relevant judgments in relation to a legal question may produce references to case law with associated judgment summaries that may appear convincing in their form, but which are "hallucinations" - i.e. the judgments and summaries are entirely made up.

The problem of hallucinations can be partly overcome through the use of the so-called Retrieval Augmented Generation (RAG). RAG works by connecting a GPT to a database. When the GPT is prompted, it generates an output that consists of both free text and a reference to specific locations in the database. This can be of great value in legal information retrieval. For example, if a GPT is connected to authoritative legal sources, say a database of court rulings, then it will be possible to build a system that will allow the generation of legal text that also indicates authentic sources directly from these databases (in this example court rulings). In this way, the human user can to some extent safeguard against "hallucinations" and will be able to easily check whether the sources actually support the automatically generated text.

Another way to improve a GPT model's ability to generate more accurate and useful output is to use reinforcement learning to fine-tune the model. A GPT that is fine-tuned by loading texts from the domain it is to be used in and that continuously interacts with legal professionals (i.e. by using reinforcement learning) could be used to generate legal documents such as contracts, subpoenas, reminder letters, marriage contracts, etc. Such documents, which are currently drafted by lawyers from scratch or from statit templates, can be generated more flexibly in draft form by a fine-tuned GPT that is continuously updated through reinforcement learning.

GPT models can also be used in combination with other systems. For example, an information search module could find relevant judgments and legislative history related to a specific legal provision (provided that judgments and legislative history are available in a database -- i.e. a RAG set-up). The model can then create a note on how the provision should be understood. This can then be further processed by a legal professional into, for example, a statement to a client, a ministerial response, a legal scholarly article or other use.

Finally, we expect that GPTs will increasingly be used in legal-datalogical research. GPTs offer the possibility to test a given input in different scenarios in order to, for example, train a model to investigate divergent legal states in datasets or to investigate trends in interpretation practice.

There is a particular point about the use of language models that their output, if placed in an interactive process of reinforcement learning, can achieve a higher quality as they are used more. Interacting with feedback from professional users can help adjust the mathematical functions behind automated text creation. In this way, a form of abstract memory is built into the models that benefit users over time[^18]. Depending on how these language models are accessed, the training that occurs through the use of the models will either be collective (if multiple users access the same model) or individual (if a single user has exclusive access to their own model). Collective models can either be associated with very large collectives (e.g. free online use) where learning will be highly diversified, or with smaller collectives (e.g. access through a lawyers' organization where only members have access; or access through a law firm where only partners and employees of the firm have access).

When it comes to developing and using language models for legal work in a Danish context, there will be significant benefits in implementing broad reinforcement learning across private companies, public authorities and courts. For example, in the form of a common system for searching information in public databases. Overall, this would allow everyone to use a significantly better system than if each company and authority used its own system alone. So there are some qualitative benefits to increasing the quantitative use of these systems because they work better the more interaction they have with professional users.

Based on the above review of the different technologies, in the following, we will point out how technology can support different legal work tasks.

## 6. Using artificial intelligence to derive information for fact-finding

It is a fundamental condition of any legal decision, whether made by an administrative authority, a private company or a court, that the facts are correctly represented in the decision. By correctly "represented" we mean that the description and understanding of the facts of a case on which the decision is based must be perceived as accurate.

Facts can be represented in a case in different ways: e.g. through documents, party statements, witness testimony, photo or video reproduction, inspection, etc. Artificial intelligence can play a role in fact representation, and here we will outline how this technology can be used in various forms of fact representation.

First and foremost, it is obvious that artificial intelligence can be used to search for existing information in public databases. Public authorities hold a range of information about the country's citizens, such as age, place of residence, income, car ownership, assets, receipt of public benefits, criminal convictions, tax payments, marriage, registered cohabitation, children, health information, etc. Depending on who decides what, and what information is authorized and possible to collect, such information can be collected automatically.

Artificial intelligence systems can be programmed to obtain certain types of information for certain types of decisions. As public authorities' information about citizens is generally of good quality (correct and up-to-date), in the vast majority of cases, such information can be used as a basis for case processing.

Publicly available information that citizens and companies themselves post freely on the internet can also be retrieved using artificial intelligence. Citizens' posting of text, images and video on the internet constitutes a very large amount of data that can contain relevant factual information. Information of this kind can be included as elements in the compilation of facts for a case. Artificial intelligence can, if authorized, be used to scan the internet to search for information that can then be included as factual representation in criminal cases[^19].

Private companies sometimes collect and store information that is used by public authorities. EU Directive 2016/681 on passenger name records, for example, obliges airlines to collect information about their customers, including who is flying; from where; to where; when; who paid for the flight; when the ticket was booked; when it was paid for; baggage included; etc. The information is intended to enable police to better prevent and solve terrorism and other forms of serious crime. Artificial intelligence can be used to analyze travel patterns, which in turn can form the basis for further investigation of specific travellers[^20].

The logging of location data by telecommunications companies can also be searched using artificial intelligence and thus help support the prosecution's work in compiling evidence in criminal cases[^21].

As a further example of an application area, we can point out that an artificial intelligence system could be used to find invalid transactions prior to a bankruptcy or irregularities in companies' accounting and the like. By analyzing historical transaction data, irregular (suspicious) transactions can be identified, and then objected to further qualitative inquiry and legal assessment. Another application area is the use of artificial intelligence to structure and select data from complex factual information. By generating timelines, or site locations, overview of chemical compositions, environmental information, etc. artificial intelligence can support compliance in industry, urban planning, construction, etc. or help reconstruct events in criminal cases, etc.

An example from the US shows how AI is already in use to support the identification of facts that can form the basis for decision-making. The *Securities and Exchange Commission (SEC)* uses AI to detect suspicious trading: algorithms examine all public trading on the American Stock Exchange and identify suspicious trading patterns, which can then form the basis for further investigations into whether illegal insider trading is taking place. Similar technology is used to detect fraudulent reporting to the *SEC*[^22].

## 7. Using artificial intelligence to determine legal content

No legal decision without law. Legal information retrieval is therefore part of any kind of legal work. We have described in general terms above how artificial intelligence can support legal information retrieval. More specifically, legal information retrieval with the use of AI can be embedded in case management procedures in public authorities. This could be done by incorporating an automated display of the authority's most similar previous cases to the case currently being decided. This can save time for caseworkers because they then do not have to manually search for relevant practice (prior decisions in similar cases). Such automated retrieval can also help to support a uniform decision practice[^23]. Many public authorities already use pre-formatted paradigms that facilitate the work of writing decisions, but to our knowledge, there are no systems that automatically match the authority's pre-existing administrative practice to the content of the new case to be decided. Incorporating such systems into the case management process supports the alignment of the authorities' decision-making practice, and thereby strengthens the rule of law.

Private companies also make a number of decisions, for example, about the rights and obligations of customers or business partners towards the company. Such rights and obligations typically arise from and are defined by contractual relationships, but can also result from legislation, such as GDPR or the Consumer Sales Act. Companies with many customer relationships can use AI for contract management and to ensure compliance with applicable legislation.

Artificial intelligence can also support the determination of law in other ways. As part of determining law, there is often a need to interpret the law. Of course, the law is interpreted continuously through its application in practice, but sometimes more fundamental questions arise that require a deeper examination of the law. This involves, among other things, searching for legislative history(*travaux preparatoire*), which can be a time-consuming task because these are not always accessible in the same information systems as the enacted law. Artificial intelligence could facilitate legislative interpretation by linking enacted legislation to relevant preparatory material.

Artificial intelligence has also become relevant for other legal tasks related to determining the law, especially after the emergence of large language models. Formulating and reviewing contracts using artificial intelligence holds great potential. Standardization of contracts and other types of legal documents through the use of paradigms is already in use, and *due diligence* is also already supported by AI. However, with the advent of new language models, it is now also possible to create and edit contractual text. Lawyers will be able to automate the creation of e.g. draft contracts, subpoenas, etc. through the prompts that activate text creation. In this way, artificial intelligence can be used to support the formulation of agreements and thus in the creation of the terms that apply between the contracting parties[^24].

During the contract negotiation phase, language models can assist by, for example, suggesting wording, identifying unclear or ambiguous terms and comparing contract content with the content of an existing contract portfolio of known good quality. Automated contract negotiation is also a possible scenario. This could increase the accuracy and efficiency of contract drafting. Automated comparison of draft contracts with legislation and case law would also be an option. This could reduce the risk of future disputes by identifying potential problems in the contract text.

In addition, such technologies could prove particularly useful in cases where there is a lot of data[^25], e.g. many contracts. An example could be the need to analyze thousands of leases and assess financial risk assessment for the sale of a residential rental business. Another application area could be the automatic review of employment contracts in order to assess the content of the contracts against standard practice in the field. Such a system could support trade unions in assisting their members to ensure proper contractual conditions in employment.

As a further example related to contract drafting, consider using artificial intelligence to conduct an analysis of legal documents and contracts for quality assurance purposes. For example, by training on known good contracts and relevant contract interpretation practices, it will be possible to build a model that identifies any flaws in new contracts or other legal documents. For example, is a non-compete clause worded in a sufficiently comprehensive way - or are there elements of the contract that should be worded differently? Is a clause in a will or in a prenuptial agreement worded sufficiently clear? Or would some other wording be better? A GPT will be able to suggest alternative wordings and combined with a database search could simultaneously show wording used in other contracts.

Other applications of artificial intelligence are also attracting attention. One example is the ability to analyze case law from the European Court of Justice in combination with case law from one or more member states. As several large language models work across languages, they will be able to find correlations and inconsistencies in court decisions across borders and languages. This will eventually make it possible to build cross-national knowledge bases that can form the basis for comparative analyses of the implementation of EU law in the individual member states. This will have significant research value and will also in practice increase awareness of the implementation of EU law in different member states.

AI could also be used to find other correlations in practice, for example by analyzing relationships between decision outcomes and (types of) cases or parties to cases. This is information that is relatively easy to identify automatically (either through metadata in judgment databases or by coding a model that finds the information directly in the judgment). Such information can be used to assess probabilities of case outcomes for different types of cases - information that can be used when considering whether it would be a good idea to take a case to court.

The final example is the determination of law through legal interpretation rooted in legal literature. Legal literature provides a systematization and interpretation of case law that is broader and has a higher level of abstraction than the individual case or legal provision. Legal research shows how different laws interact with each other and projects the underlying rationales for the organization of legislation, which are not always apparent in the legislation itself, but are based on a collective interpretation of the legal text, preparatory works and case law generated over time. Legal literature: textbooks, PhD dissertations, doctoral theses, annotated laws, and legal articles on specific legal issues often provide an entry point for the practising lawyer to place a new case in its proper legal context. Access to and use of legal literature is thus an important and integral part of legal work.

Unlike legislation and published administrative and judicial practice, legal literature is protected by copyright. The individual authors and publishers have rights to the texts, which is why they cannot be used to train language models without further ado. However, with the necessary permissions, it is possible to train language models on these texts and use artificial intelligence to automatically search for relevant passages in the literature. If legal literature is stored digitally in full text, language models can perform intelligent searches in even large and unorganized volumes of text. The text found could then be used as inspiration for a user to prompt the language model, which in turn will generate a new text[^26]. This will help to increase the legal quality of the texts produced by the model. As already mentioned above, it is important to be aware that such language models can "hallucinate", but as also mentioned, RAG systems may be used to reduce hallucinations and increase the verifiability of the output[^27].

## 8. Using artificial intelligence to subsume facts under law

By far the most controversial use of artificial intelligence in a legal context is in implementing automated decisions. We began this article by pointing out that automated decisions are already being made today, but also pointed out that these are not based on ML and may not even fall under the definition of artificial intelligence, at least as per the definition in the EU AI Act. The characteristic of the decisions where automation is used is that they have a very routine nature and that there is no discretion attached to the decision.

Although there has been speculation about using ML to make legal decisions, to our knowledge only been attempted in China[^28]. *The Social Securities Administration* in the US uses NLP combined with information extracted from their case management system to "raise flags" in draft decisions and thereby help decision makers to pay particular attention to whether their decisions are sufficiently complete and consistent[^29]. This is not automated legal inference or decision making, but automated quality control of draft decisions.

In general, it is our assessment that there is still some way to go before artificial intelligence can be used to fully automate legal decisions in areas that do not have a very simple structure. There are several reasons for this, but the main one is that legal *judgment* is a broadly rooted contextual competence of trained lawyers that is very difficult to translate into a mathematical function. The ability to empathize, the ability to draw on a lifetime of experience, and the ability to combine formal education and legal knowledge with concrete information in a variety of cases is a uniquely human skill that can hardly, if ever, be performed by machines.

### OVERGANG

In this context, it is also worth noting that the President of the *US Supreme Court*, John G Roberts Jr. in the 2023 Annual Report of *the Federal Judiciary,* focuses on the technological evolution from quills to artificial intelligence. In the report, he points out some of the known weaknesses of artificial intelligence, including the "hallucinations" mentioned above, but he also writes the following[^30]:

> "I predict that human judges will be around for a while. But with equal confidence I predict that judicial work-particularly at the trial level-will be significantly affected by AI. Those changes will involve not only how judges go about doing their job, but also how they understand the role that AI plays in the cases that come before them."

Although the statement does not point to any particular transformation of judicial work, it is still remarkable that the president of perhaps the world's most famous and talked about court makes such a significant statement about a technology many are not yet fully familiar with. Many would probably urge a little more caution and few would probably imagine that the task of making a legal judgment could be particularly affected by artificial intelligence.

## 9. Conclusion: Natural and artificial intelligence in the justice system

Artificial intelligence systems reflect the data on which the system is trained and validated. In a sense, this also applies to human intelligence. Our competence and knowledge depend on the information and actions we take in and process throughout our lives. But as mentioned above, there are also significant qualitative differences between human and artificial intelligence. Artificial intelligence works through mathematical functions over a data set, whereas human intelligence is much more based on life experience. This is also what American judge and legal philosopher O.W. Holmes captured when he wrote the following in his famous book The Common Law[^31]:

> "The life of the law has not been logic: it has been experience ... The law embodies the story of a nation's development through many centuries, and it cannot be dealt with as if it contained only the axioms and corollaries of a book of mathematics..."

Written in 1881, long before the invention of the computer, this text targets a tendency at Harvard Law School at the time to formalize legal reasoning as syllogisms and inferences from general principles of law. For Holmes, law was a practical discipline that was more about understanding culture - living life - rather than a matter of logically deriving conclusions from some abstract doctrine. Holmes' criticism of Langdell (then Dean of Harvard Law School) is comparable to the criticism that can be levelled at the use of artificial intelligence for legal tasks: the essence of law is not mathematics, but judgment. You can put as many rules into the computer as you like, but life and reality cannot be reduced to math[^32]. Nevertheless, Holmes continues his text as follows[^33]:

> "In order to know what it \[the law] is, we must know what it has been, and what it tends to become. We must alternately consult history and existing theories of legislation. But the most difficult labor will be to understand the combination of the two into new products at every stage. The substance of the law at any given time pretty nearly corresponds, so far as it goes, with what is then understood to be convenient; but its form and machinery, and the degree to which it is able to work out desired results, depend very much upon its past."

There is a nuance here, because artificial intelligence can support our study of legislation, including its history, existing case law and the legal theory built around these texts. If law is to be understood as a coherent whole and not just as individual decisions, then there must be a system and this system ("the form and machinery of law") must be represented in a coherent way. This has always been the goal of doctrinal jurisprudence, and in its best versions, this is precisely what artificial intelligence can represent: A knowledge system in the form of a network that links the sources of law into a coherent unified system.

There is still a long way to go before artificial intelligence can represent our legal system in its entirety. It may never happen. But AI is entering the legal workplace, and lawyers will increasingly have to interact with AI systems. Of course, this means not only learning how to use such systems, but also learning how to critically engage with them - both of which are only possible by understanding how they work. We hope to have contributed to this through this article.

## Footnotes

[^1]

There are now at least two established international conferences focused on artificial legal intelligence: Jurix: International Conference on Legal Knowledge and Information Systems, which has existed since 1988 and is held annually (<http://jurix.nl/>) and ICAIL: International Conference on Artificial Intelligence and Law (<https://dl.acm.org/conference/icail>), which is organized by the Association for Computing Machinery. In addition, there is an annual workshop with a special focus on Natural Legal Language Processing <https://nllpw.org/workshop/call/> which has been held at various NLP conferences.

[^2] 

See for example: [https://tracxn.com/d/sectors/legal-tech/__SjCGNk9sSTU9TDUjFH4IyX9Qo7HLyIkGfSZ2eXYvQkM](https://tracxn.com/d/sectors/legal-tech/__SjCGNk9sSTU9TDUjFH4IyX9Qo7HLyIkGfSZ2eXYvQkM) for an overview of the development in the US.  On the importance of artificial intelligence for the legal profession more generally, see for example: Richard Susskind (2017) - Tomorrow's Lawyers: An Introduction To Your Future. OUP.

[^3]

See, for example, on a system designed to assess specific questions related to US tax law: L. T. McCarty, 'Reflections on "Taxman": An Experiment in Artificial Intelligence and Legal Reasoning', 90 *Harvard Law Review* 5, March 1977, pp. 837-893. In the 1990s, Kevin Ashley developed a system aimed at providing answers to legal questions about trade secret protection: Kevin D. Ashley, Reasoning with cases and hypotheticals in HYPO, International Journal of Man-Machine Studies, Volume 34, Issue 6, 1991, Pages 753-796.

[^4]

The following information can be found on the website of the Danish Land Registration Court: "Today, all land registration is based on digital documents that are reported on the land registration portal www.tinglysning.dk, and which are signed with digital signatures. Today, approximately 87 percent of all notifications are processed automatically, i.e. in less than five seconds, while the remaining - typically more complicated - notifications are processed manually by the approximately 90 employees currently employed at the Land Registration Court in Hobro." (<https://domstol.dk/tinglysningsretten/om-tinglysningsretten/tinglysningsrettens-historie/>) (Translated from Danish by DeepL)

[^5]

Thea Johanne Raugland Wisborg states in her PhD thesis "Fully automated decisions in Danish administration" that: "at least 75% of all applications received via the self-service system minSU were decided fully automatically in 2020." (s. 82). (translated from Danish by DeepL)

[^6]

See: <https://sktst.dk/arsopgoerelsen/den-digitale-aarsopgoerelse>

[^7] 

See for example: <https://www.globallegalpost.com/news/more-than-half-of-in-house-lawyers-back-chatgpts-use-for-legal-work-study-shows-2042534205>

[^8] 

The regulation is available in a preliminary English language version here: <https://www.europarl.europa.eu/doceo/document/TA-9-2024-0138_EN.pdf> A final version of the text will be published after processing by the Directorate General for translation.

[^9] 

In a legal context, training data can consist of many different things, such as adjudication practice, prosecution practice, contract practice, or it can be aimed at factual matters, such as investigating transactional practices to identify e.g. tax fraud, illegal insider trading, bankruptcy law circumvention, social fraud, illegal accounting practices or similar.

[^10]

As an example, see <https://www.artificiallawyer.com/2018/02/26/lawgeex-hits-94-accuracy-in-nda-review-vs-85-for-human-lawyers/> and [https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4539836&dgcid=ejournal_htmlemail_university%3Aof%3Aminnesota%3Alaw%3Aschool%3Alegal%3Astudies%3Aresearch%3Apaper%3Aseries_abstractlink](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4539836&dgcid=ejournal_htmlemail_university:of:minnesota:law:school:legal:studies:research:paper:series_abstractlink) for an experiment on student use of ChatGPT. See also: <https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4626276>

[^11] 

But see the debate between Søgaard and Landgrebe and Smith in: Landgrebe, J., & Smith, B. (2021). Making ai meaningful again. Synthese, 198(March), 2061--2081; Søgaard, A. Understanding models understanding language. Synthese 200, 443 (2022); Landgrebe J., & Smith, B. (2023) - Why machines do not understand: A response to Søgaard. Unpublished, available at: <https://arxiv.org/abs/2307.04766>

[^12]

See e.g.: Michael D. Murray  (2023) - Artificial Intelligence and the Practice of Law Part 1: Lawyers Must be Professional and Responsible Supervisors of AI, available at: <https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4478588>  ibm.

[^13] 

For an introduction to GPT's, see: <https://en.wikipedia.org/wiki/Generative_pre-trained_transformer#Foundational_models>. The transformer technology was first launched by Google researchers in: <https://arxiv.org/abs/1706.03762>

[^14] 

As indicated above (footnote 7 (CHECK) AI is already being put to use in the legal service industry.

[^15]

A simple Google search shows that there is already a market for due diligence AI and automated contract analysis. An example is the system Harvey: https://www.harvey.ai/

[^16] 

See for example: Olsen, Henrik Palmer et al (2023) - Re-Framing Case Law Citation Prediction

from a Paragraph Perspective, in: G. Sileno et al (Eds) - Legal Knowledge and Information Systems. The article is available as open access here: <https://ebooks.iospress.nl/volumearticle/65604>

[^17]

[https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)](https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence))

[^18] 

There is research suggesting that language model performance can vary over time, see <https://arxiv.org/pdf/2307.09009.pdf> This study was conducted on ChatGPT, where it was not possible for the researchers to see behind the user interface. It is unknown if and how ChatGPT uses reinforcement learning, as OpenAI does not disclose this. The study also shows that ChatGPT in some scenarios performs worse over time, but the researchers have not managed to find explanations for this.

[^19] 

It is of course a legal question in its own right, what kind of internet authorities may scrape from the internet and how they may use that information in a court of law. As mentioned in the introduction, we do not address such regulatory questions in this article.

[^20]

See further: Henrik Palmer Olsen & Cornelius Wiesener (2021) Beyond data protection concerns - the European passenger name record system, Law, Innovation and Technology, 13:2, 398-421, DOI: 10.1080/17579961.2021.1977221

[^21] 

Again, provided that this is lawful.

[^22]

See: <https://law.stanford.edu/wp-content/uploads/2020/02/ACUS-AI-Report.pdf>

[^23]

See: Olsen, Henrik Palmer, Højmark-Bertelsen, M. & Schwemer, Sebastian Felix, 'Applying NLP to Support Legal Decision-making in Administrative Appeal Boards in the EU' , In: CEUR Workshop Proceedings. 3441, p. 103-110.

[^24]

This raises a number of interesting new questions about contract interpretation that we can't go into here.

[^25]  

<https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4626276>

[^26]

See in this direction Jaromir Savelka, Kevin D. Ashley, Morgan A. Gray, Hannes Westermann, Huihui Xu, 2023 op. cit.

[^27]

See this in section 4 above.

[^28]

See Stern, Rachel E.; Roberts, Margaret; Liebman, Benjamin L.; Wang, Alice (2021) - Automating Fairness? Artificial Intelligence in the Chinese Courts, in: 59 Columbia Journal of Transnational Law 515 (2021) and Chesterman, S., Bennett Moses, L., & Pagallo, U. (2023). All Rise for the Honorable Robot Judge? Using Artificial Intelligence to Regulate AI: a debate. Technology and Regulation, 2023, 45-57.

[^29]

See: <https://law.stanford.edu/wp-content/uploads/2020/02/ACUS-AI-Report.pdf>, s. 40.

[^30]  [](https://www.supremecourt.gov/publicinfo/year-end/2023year-endreport.pdf)

<https://www.supremecourt.gov/publicinfo/year-end/2023year-endreport.pdf> s. 6.

[^31]

Quote taken from: <https://www.britannica.com/biography/Oliver-Wendell-Holmes-Jr/The-Common-Law>

[^32] 

See also: Wang, J. (2021). Is artificial intelligence capable of understanding? An analysis based on philosophical hermeneutics. Cultures of Science, 4(3), 135-146. <https://doi.org/10.1177/20966083211056405>

[^33]

Holmes op. cit.

## References

Ashley, K. D. (1991). Reasoning with cases and hypotheticals in HYPO. International Journal of Man-Machine Studies, 34(6), 753--796. https://doi.org/10.1016/0020-7373(91)90011-U

Chen, L., Zaharia, M., & Zou, J. (2023). How is ChatGPT's behavior changing over time?

Chesterman, S., Bennett Moses, L., & Pagallo, U. (2023). All Rise for the Honourable Robot Judge? Using Artificial Intelligence to Regulate AI: a debate. Technology and Regulation, 2023, 45--57. https://doi.org/https://doi.org/10.26116/techreg.2023.005

Choi, J. H., Monahan, A., & Schwarcz, D. B. (2023). Lawyering in the Age of Artificial Intelligence. SSRN Electronic Journal. https://doi.org/10.2139/ssrn.4626276

Engstrom, D. F., Ho, D. E., Sharkey, C. M., & Cuéllar, M.-F. (2020). Government by Algorithm: Artificial Intelligence in Federal Administrative Agencies.

Landgrebe, J., & Smith, B. (2021). Making AI meaningful again. Synthese, 198(3), 2061--2081. https://doi.org/10.1007/s11229-019-02192-y

Landgrebe, J., & Smith, B. (2023). Why machines do not understand: A response to S{\o}gaard.

McCarty, L. T. (1977). Reflections on "Taxman": An Experiment in Artificial Intelligence and Legal Reasoning. Harvard Law Review, 90(5), 837. https://doi.org/10.2307/1340132

Murray, M. D. (2023). Artificial Intelligence and the Practice of Law Part 1: Lawyers Must be Professional and Responsible Supervisors of AI. SSRN Electronic Journal. https://doi.org/10.2139/ssrn.4478588

Palmer Olsen, H., Garneau, N., Panagis, Y., Lindholm, J., & Søgaard, A. (2023). Re-Framing Case Law Citation Prediction from a Paragraph Perspective. In G. Sileno, J. Spanakis, & G. van Dijck (Eds.), Legal Knowledge and Information Systems (Vol. 379, pp. 323--328). https://doi.org/10.3233/FAIA230982

Palmer Olsen, H., Højmark-Bertelsen, M., & Schwemer, S. F. (2023). Applying NLP to Support Legal Decision-making in Administrative Appeal Boards in the EU. CEUR Workshop Proceedings, 103--110.

Palmer Olsen, H., & Wiesener, C. (2021). Beyond data protection concerns -- the European passenger name record system. Law, Innovation and Technology, 13(2), 398--421. https://doi.org/10.1080/17579961.2021.1977221

Savelka, J., Ashley, K. D., Gray, M. A., Westermann, H., & Xu, H. (2023). Can GPT-4 Support Analysis of Textual Data in Tasks Requiring Highly Specialized Domain Expertise? https://doi.org/10.1145/3587102.3588792

Søgaard, A. (2022). Understanding models understanding language. Synthese, 200(6), 443. https://doi.org/10.1007/s11229-022-03931-4

Stern, R. E., Liebman, B. L., Roberts, M. E., & Wang, A. (2021). Automating Fairness? Artificial Intelligence in the Chinese Courts. Columbia Journal of Transnational Law, 59. https://ssrn.com/abstract=4026798

Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, L., & Polosukhin, I. (2017). Attention Is All You Need.

Wang, J. (2021). Is artificial intelligence capable of understanding? An analysis based on philosophical hermeneutics. Cultures of Science, 4(3), 135--146. https://doi.org/10.1177/20966083211056405
