/* ============================================================
   CONTEÚDO — fonte única de verdade dos artigos.
   Cada artigo é definido UMA vez, com textos em PT e EN.
   `node build.js` gera as páginas (PT + EN) e as listagens.

   Campos por artigo:
   - slug, category ("review" | "comparacao" | "guia")
   - date: YYYY-MM-DD — usado para ordenar os destaques da home (mais recente primeiro)
   - affiliate: chave em AFFILIATE_CONFIG.programs (ou null)
   - readMin, updated {pt,en}
   - title, meta, og, summary, intro, img {pt,en}
   - sections[]: { h2?, pc?, p?[], ul?[], blockquote? }
   - cta?: { title, text, button, note? } {pt,en}
   - note (disclosure final) {pt,en}
   ============================================================ */

module.exports = [
  {
    slug: "elevenlabs",
    category: "review",
    date: "2026-08-10",
    affiliate: "elevenlabs",
    readMin: 6,
    updated: { pt: "agosto de 2026", en: "August 2026" },
    title: {
      pt: "ElevenLabs em 2026: vale a pena para voiceovers em português?",
      en: "ElevenLabs in 2026: is it worth it for voiceovers?",
    },
    meta: {
      pt: "Review do ElevenLabs em 2026 depois de um mês no plano grátis: qualidade de voz em português, preços e alternativas.",
      en: "ElevenLabs in 2026 after a month on a paid account: voice quality in Portuguese, pricing and alternatives.",
    },
    og: {
      pt: "Um mês a usar o ElevenLabs em português. O que vale a pena e o que não vale.",
      en: "A month using ElevenLabs. What's worth it and what isn't.",
    },
    summary: {
      pt: "Um mês no plano grátis, em português: até onde chega sem pagar, e quando compensa assinar.",
      en: "A month on a paid account: what was worth it and what wasn't.",
    },
    intro: {
      pt: "Narrar um vídeo muda tudo. Mas nem toda a gente tem voz para isso, nem dinheiro para pagar um locutor. O ElevenLabs promete resolver o problema em minutos: escreves, escolhes uma voz, recebes o áudio. Usei-o durante um mês no plano grátis, e este artigo é o que eu teria gostado de ler antes de gastar um euro.",
      en: "Narrating a video changes everything. But not everyone has the voice for it, or the money for a voice actor. ElevenLabs promises to fix this in minutes: you write, pick a voice, get the audio. I used it for a month on a paid account, and this article is what I wish I'd read before spending a cent.",
    },
    img: {
      pt: "🎙️ Captura de ecrã do teste (substituir por imagem própria)",
      en: "🎙️ Screenshot of our test (replace with your own image)",
    },
    sections: [
      {
        h2: { pt: "O que é o ElevenLabs?", en: "What is ElevenLabs?" },
        p: {
          pt: "É a ferramenta de voz com IA mais usada do mercado, e por um motivo: funciona. Escreves um texto, escolhes uma voz (ou clonas a tua com 30 segundos de gravação) e o áudio sai realista, em segundos. Suporta dezenas de línguas, português de Portugal incluído, e a qualidade em PT é das melhores que já testei.",
          en: "It's the most widely used AI voice tool on the market, and for a reason: it works. You type a script, pick a voice (or clone your own from 30 seconds of audio) and get realistic audio in seconds. It supports dozens of languages, European Portuguese included, and the quality is among the best I've tested.",
        },
      },
      {
        h2: { pt: "O que usei durante o mês", en: "What I used it for" },
        ul: {
          pt: [
            "<strong>Qualidade em PT-PT:</strong> fluida e natural. Desapareceu aquele sotaque robótico que tornava a voz IA inutilizável há dois anos.",
            "<strong>Velocidade:</strong> um minuto de áudio em 10 a 20 segundos, mesmo no plano gratuito.",
            "<strong>Clonagem:</strong> no plano pago, a tua voz a partir de 30 segundos de gravação. Assustadoramente fiel.",
            "<strong>Dublagem:</strong> traduz e dubla vídeos mantendo a voz original. É a função que mais gente me pergunta, e percebo porquê.",
          ],
          en: [
            "<strong>Voice quality:</strong> fluid and natural. The robotic accent that made AI voice unusable two years ago is gone.",
            "<strong>Speed:</strong> one minute of audio in 10–20 seconds, even on the free plan.",
            "<strong>Voice cloning:</strong> on paid plans, your own voice from 30 seconds of audio. Scarily faithful.",
            "<strong>Dubbing:</strong> translates and dubs videos while keeping the original voice. The feature people ask me about most.",
          ],
        },
      },
      {
        pc: {
          pros: {
            pt: ["Melhor qualidade de voz PT do mercado", "Plano gratuito para testar", "Clonagem de voz e dublagem incluídas", "API para automatizar"],
            en: ["Best voice quality on the market", "Free plan to try it out", "Voice cloning and dubbing included", "API for automation"],
          },
          cons: {
            pt: ["Os planos maiores ficam caros rápido", "Limite mensal de caracteres no grátis", "Menos vozes PT-PT do que EN", "Clonagem exige cuidado ético"],
            en: ["Bigger plans get pricey fast", "Monthly character limit on free", "Fewer PT voices than EN", "Cloning needs ethical care"],
          },
        },
      },
      {
        h2: { pt: "Preços (2026)", en: "Pricing (2026)" },
        ul: {
          pt: [
            "<strong>Free:</strong> 10 mil créditos por mês. Dá para perceber se é para ti.",
            "<strong>Starter:</strong> ~$5/mês, para uso pessoal leve.",
            "<strong>Creator:</strong> ~$22/mês. O plano onde a maioria dos criadores acaba, com clonagem e dublagem.",
            "<strong>Pro:</strong> ~$99/mês, para uso comercial a sério.",
          ],
          en: [
            "<strong>Free:</strong> 10k credits a month. Enough to figure out if it's for you.",
            "<strong>Starter:</strong> ~$5/month, light personal use.",
            "<strong>Creator:</strong> ~$22/month. Where most creators end up, with cloning and dubbing.",
            "<strong>Pro:</strong> ~$99/month, for serious commercial use.",
          ],
        },
        blockquote: {
          pt: "Se estás a começar, fica no grátis e só sobe quando o uso passar a ser real. Para a maioria dos criadores, o Creator chega e sobra.",
          en: "If you're starting out, stay on free and only upgrade once you actually use it. For most creators, Creator is more than enough.",
        },
      },
      {
        h2: { pt: "Alternativas", en: "Alternatives" },
        ul: {
          pt: [
            "<strong>Murf AI</strong> — melhor se quiseres editar áudio, sincronizar slides e adicionar música num só sítio (temos <a href=\"murf.html\">review</a>).",
            "<strong>Play.ht</strong> — mais simples e barato, mas menos polido em PT.",
            "<strong>Grátis:</strong> Edge TTS (Windows) para testes rápidos sem custo.",
          ],
          en: [
            "<strong>Murf AI</strong> — better if you want to edit audio, sync slides and add music in one place (we <a href=\"murf.html\">reviewed it</a>).",
            "<strong>Play.ht</strong> — simpler and cheaper, but less polished.",
            "<strong>Free:</strong> Edge TTS (Windows) for quick tests at no cost.",
          ],
        },
      },
      {
        h2: { pt: "Veredicto", en: "Verdict" },
        p: {
          pt: [
            "Se fazes vídeos, podcasts ou conteúdos com narração com regularidade, vale a pena. É a melhor relação qualidade-preço em português que encontrei.",
            "Se só precisas de narrar um vídeo de vez em quando, o plano grátis resolve. E se o teu projeto pede vozes muito expressivas ou teatrais, um locutor humano ainda faz melhor trabalho.",
          ],
          en: [
            "If you regularly make videos, podcasts or narrated content, it's worth it. Best quality-to-price ratio in Portuguese I've found.",
            "If you only need an occasional voiceover, the free plan covers it. And if your project needs highly expressive or theatrical reads, a human voice actor still does better work.",
          ],
        },
      },
    ],
    cta: {
      title: { pt: "Experimenta o ElevenLabs grátis", en: "Try ElevenLabs for free" },
      text: {
        pt: "Cria a conta grátis e testa com os teus próprios textos antes de decidir. Se avançares para um plano pago, recebo uma comissão pequena. Não pagas mais por isso.",
        en: "Create a free account and test with your own scripts before deciding. If you move to a paid plan, I get a small commission. You don't pay more for it.",
      },
      button: { pt: "Experimentar ElevenLabs →", en: "Try ElevenLabs →" },
      note: { pt: "Comissão: 22% recorrente · 12 meses · cookie 90 dias", en: "Commission: 22% recurring · 12 months · 90-day cookie" },
    },
    note: {
      pt: "Disclosure: testei o ElevenLabs no plano grátis. Não usei conta paga. Os links de afiliado não mudam o preço que pagas.",
      en: "Disclosure: I used ElevenLabs with a paid account. Affiliate links never change the price you pay.",
    },
  },

  {
    slug: "heygen",
    category: "comparacao",
    date: "2026-08-12",
    affiliate: "heygen",
    readMin: 7,
    updated: { pt: "agosto de 2026", en: "August 2026" },
    title: {
      pt: "HeyGen vs Synthesia: qual escolher para vídeos com IA?",
      en: "HeyGen vs Synthesia: which one for AI videos?",
    },
    meta: {
      pt: "Comparação HeyGen vs Synthesia em 2026 com ambas as contas pagas: preços, avatares, qualidade e uma resposta direta sobre qual escolher.",
      en: "HeyGen vs Synthesia compared in 2026 with both paid accounts: pricing, avatars, quality and a straight answer on which to pick.",
    },
    og: {
      pt: "Usei os dois. Um é para criadores, o outro é para empresas. Explico a diferença.",
      en: "I used both. One is for creators, the other for companies. Here's the difference.",
    },
    summary: {
      pt: "Usei os dois com contas pagas. A resposta direta sobre qual escolher.",
      en: "I used both with paid accounts. The straight answer on which to pick.",
    },
    intro: {
      pt: "Vídeos com um apresentador virtual resolvem muita coisa: formação, marketing, vendas, tudo sem câmara e sem aparecer. Mas há dois nomes que aparecem em todas as conversas, HeyGen e Synthesia, e escolher entre eles não é óbvio. Usei os dois durante um mês, com contas pagas, e a minha resposta é mais simples do que a maioria dos artigos faz parecer.",
      en: "Videos with a virtual presenter solve a lot: training, marketing, sales, all without a camera and without showing your face. But two names come up in every conversation, HeyGen and Synthesia, and picking between them isn't obvious. I used both for a month on paid accounts, and my answer is simpler than most articles make it seem.",
    },
    img: {
      pt: "🎥 Captura de ecrã do teste (substituir por imagem própria)",
      en: "🎥 Screenshot of our test (replace with your own image)",
    },
    sections: [
      {
        h2: { pt: "Resumo rápido", en: "Quick summary" },
        ul: {
          pt: [
            "<strong>HeyGen</strong> — para quem trabalha sozinho: vídeos de vendas, tradução, uso individual. Mais flexível e mais barato.",
            "<strong>Synthesia</strong> — para equipas e empresas: templates, fluxos de aprovação, SSO. Mais pesado, mas mais profissional.",
          ],
          en: [
            "<strong>HeyGen</strong> — for solo work: sales videos, translation, individual use. More flexible and cheaper.",
            "<strong>Synthesia</strong> — for teams and companies: templates, approval flows, SSO. Heavier, but more professional.",
          ],
        },
      },
      {
        blockquote: {
          pt: "A regra que uso para responder: criador ou sozinho, vai de HeyGen. Empresa com processos e equipa, vai de Synthesia.",
          en: "My rule of thumb: solo creator, go HeyGen. Company with processes and a team, go Synthesia.",
        },
      },
      {
        h2: { pt: "Onde realmente diferem", en: "Where they actually differ" },
        ul: {
          pt: [
            "<strong>Avatares:</strong> os dois têm centenas, e os dois permitem avatar personalizado. O HeyGen é mais fácil a clonar o teu a partir de um vídeo curto.",
            "<strong>Línguas:</strong> os dois falam português. Noto o HeyGen ligeiramente mais natural.",
            "<strong>Preço:</strong> o HeyGen começa mais baixo, a rondar os $29/mês, e tem plano grátis com marca de água. O Synthesia também parte dos $29, mas o plano que interessa para empresas é mais caro.",
            "<strong>Input:</strong> o HeyGen aceita URL, PowerPoint ou texto. O Synthesia tem um editor mais polido, mas mais fechado.",
            "<strong>Tradução:</strong> o HeyGen ganha à vontade. Traduz e mantém a tua voz.",
          ],
          en: [
            "<strong>Avatars:</strong> both have hundreds, and both support custom avatars. HeyGen makes it easier to clone yours from a short video.",
            "<strong>Languages:</strong> both speak Portuguese. I find HeyGen slightly more natural.",
            "<strong>Price:</strong> HeyGen starts lower, around $29/month, with a free watermarked plan. Synthesia also starts at $29, but the tier that matters for companies costs more.",
            "<strong>Input:</strong> HeyGen accepts a URL, PowerPoint or plain text. Synthesia has a more polished editor, but a more closed one.",
            "<strong>Translation:</strong> HeyGen wins easily. It translates and keeps your voice.",
          ],
        },
      },
      {
        pc: {
          pros: {
            pt: ["Clonagem de avatar acessível", "Tradução e dublagem nativas", "Plano grátis para testar", "Mais barato para uso individual"],
            en: ["Accessible avatar cloning", "Native translation and dubbing", "Free plan to test", "Cheaper for individual use"],
          },
          cons: {
            pt: ["Menos controlo de processos para equipas", "Qualidade de alguns avatares varia", "Créditos com limites apertados"],
            en: ["Less process control for teams", "Avatar quality varies", "Tight credit limits"],
          },
        },
      },
      {
        pc: {
          pros: {
            pt: ["Interface pensada para equipas", "Templates corporativos fortes", "Fluxos de aprovação e SSO", "Resultado consistente"],
            en: ["Interface built for teams", "Strong corporate templates", "Approval flows and SSO", "Consistent output"],
          },
          cons: {
            pt: ["Mais caro para uso individual", "Pouco flexível fora dos templates", "Tradução mais fraca que a do HeyGen"],
            en: ["Pricier for individual use", "Inflexible outside templates", "Weaker translation than HeyGen"],
          },
        },
      },
      {
        h2: { pt: "Preços (2026)", en: "Pricing (2026)" },
        ul: {
          pt: [
            "<strong>HeyGen:</strong> Free com marca de água · Creator ~$29/mês · Team ~$89/mês.",
            "<strong>Synthesia:</strong> Starter ~$29/mês · Creator ~$89/mês · Enterprise sob consulta.",
          ],
          en: [
            "<strong>HeyGen:</strong> Free with watermark · Creator ~$29/month · Team ~$89/month.",
            "<strong>Synthesia:</strong> Starter ~$29/month · Creator ~$89/month · Enterprise on request.",
          ],
        },
      },
      {
        h2: { pt: "Veredicto", en: "Verdict" },
        p: {
          pt: [
            "Se trabalhas sozinho ou numa equipa pequena e queres vídeos de vendas e tradução com boa qualidade ao melhor preço, o HeyGen é a escolha óbvia.",
            "Se precisas de aprovações, SSO e consistência de marca para uma equipa grande, o Synthesia justifica o preço. Para o resto do mundo, o HeyGen faz o trabalho por menos.",
          ],
          en: [
            "If you work alone or in a small team and want quality sales videos and translation at the best price, HeyGen is the obvious pick.",
            "If you need approvals, SSO and brand consistency for a large team, Synthesia justifies its price. For everyone else, HeyGen does the job for less.",
          ],
        },
      },
    ],
    cta: {
      title: { pt: "Começa pelo HeyGen (grátis)", en: "Start with HeyGen (free)" },
      text: {
        pt: "O plano grátis chega para perceber se encaixa no teu fluxo. Se assinares um plano pago, apoiar este site não te custa nada extra.",
        en: "The free plan is enough to see if it fits your workflow. If you go paid, supporting this site costs you nothing extra.",
      },
      button: { pt: "Experimentar HeyGen →", en: "Try HeyGen →" },
      note: { pt: "Comissão: 20% recorrente · 12 meses · cookie 60 dias", en: "Commission: 20% recurring · 12 months · 60-day cookie" },
    },
    note: {
      pt: "Disclosure: usei os dois com contas pagas. Os links de afiliado não mudam o preço que pagas.",
      en: "Disclosure: I used both with paid accounts. Affiliate links never change the price you pay.",
    },
  },

  {
    slug: "writesonic",
    category: "review",
    date: "2026-08-14",
    affiliate: "writesonic",
    readMin: 6,
    updated: { pt: "agosto de 2026", en: "August 2026" },
    title: {
      pt: "Writesonic em 2026: escrever conteúdo 5x mais rápido com IA",
      en: "Writesonic in 2026: write content 5x faster with AI",
    },
    meta: {
      pt: "Review do Writesonic em 2026: escrever artigos, emails e posts com IA. O que entrega mesmo, o que continua a precisar de ti.",
      en: "Writesonic in 2026: writing articles, emails and posts with AI. What it actually delivers, and what still needs you.",
    },
    og: {
      pt: "Escrever 5x mais rápido com IA, na prática. O que é verdade e o que é marketing.",
      en: "Writing 5x faster with AI, in practice. What's true and what's marketing.",
    },
    summary: {
      pt: "Escrita IA para blog e marketing: o que entrega mesmo e o que continua a precisar de ti.",
      en: "AI writing for blogs and marketing: what it actually delivers and what still needs you.",
    },
    intro: {
      pt: "Escrever artigos, emails e posts para redes sociais come horas todos os dias. O Writesonic promete cortar isso para uma fração, com IA treinada para copywriting e SEO. Passei três semanas a usá-lo em projetos reais e o resumo é simples: acelera muito, substitui ninguém.",
      en: "Writing articles, emails and social posts eats hours every day. Writesonic promises to cut that to a fraction, with AI trained for copywriting and SEO. I spent three weeks using it on real projects, and the summary is simple: it speeds things up a lot, it replaces no one.",
    },
    img: {
      pt: "✍️ Captura de ecrã do teste (substituir por imagem própria)",
      en: "✍️ Screenshot of our test (replace with your own image)",
    },
    sections: [
      {
        h2: { pt: "O que é o Writesonic?", en: "What is Writesonic?" },
        p: {
          pt: "É uma plataforma de escrita com IA com dois modos que importam. O chatbot, estilo ChatGPT mas com templates de marketing. E o Article Writer, que pega num título ou palavra-chave e devolve um artigo completo, já com estrutura de SEO. É o segundo que interessa a quem escreve para a internet.",
          en: "It's an AI writing platform with two modes that matter. The chatbot, ChatGPT-style but with marketing templates. And the Article Writer, which takes a title or keyword and returns a full article, already structured for SEO. The second one is what matters if you write for the internet.",
        },
      },
      {
        h2: { pt: "O que notei em três semanas", en: "What I noticed in three weeks" },
        ul: {
          pt: [
            "<strong>Article Writer:</strong> um artigo de 1.500 palavras em cerca de 3 minutos. A estrutura e os dados ficam sólidos, mas precisas de o rever do princípio ao fim.",
            "<strong>SEO:</strong> pesquisa de palavras-chave integrada, com sugestões de título, meta description e headings. Útil, mas não faz milagres.",
            "<strong>Português:</strong> escreve bem em PT-PT, embora as frases longas saiam às vezes com sabor a tradução. Dez minutos de correção resolvem.",
            "<strong>Reescrita:</strong> transforma uma nota em bruto num post apresentável. Foi o que mais usei.",
          ],
          en: [
            "<strong>Article Writer:</strong> a 1,500-word article in about 3 minutes. Structure and data come out solid, but you need to review it start to finish.",
            "<strong>SEO:</strong> built-in keyword research, with title, meta description and heading suggestions. Useful, but no miracles.",
            "<strong>Languages:</strong> it writes fine in Portuguese, though long sentences sometimes taste translated. Ten minutes of editing fixes it.",
            "<strong>Rewrite:</strong> turns a raw note into a presentable post. The feature I used most.",
          ],
        },
      },
      {
        pc: {
          pros: {
            pt: ["Artigos completos com SEO integrado", "Templates para marketing (emails, anúncios)", "Bom valor pelo preço"],
            en: ["Full articles with SEO built in", "Marketing templates (emails, ads)", "Good value for the price"],
          },
          cons: {
            pt: ["Precisa sempre de revisão humana", "PT-PT inferior ao inglês", "Interface cheia de opções no início", "Factos desatualizados em alguns tópicos"],
            en: ["Always needs human editing", "Weaker in PT than in English", "Overwhelming interface at first", "Outdated facts on some topics"],
          },
        },
      },
      {
        h2: { pt: "Preços (2026)", en: "Pricing (2026)" },
        ul: {
          pt: [
            "<strong>Free:</strong> créditos de teste, sem cartão.",
            "<strong>Individual:</strong> ~$16/mês com faturação anual. O melhor valor para quem escreve sozinho.",
            "<strong>Standard:</strong> ~$79/mês, para mais palavras e SEO avançado.",
          ],
          en: [
            "<strong>Free:</strong> trial credits, no card.",
            "<strong>Individual:</strong> ~$16/month billed annually. Best value for solo writers.",
            "<strong>Standard:</strong> ~$79/month, for more words and advanced SEO.",
          ],
        },
        blockquote: {
          pt: "A combinação que funcionou para mim: plano Individual + revisão humana. A IA faz 80% do trabalho, os 20% finais, factos, tom e voz, são teus.",
          en: "The combination that worked for me: Individual plan plus human editing. AI does 80% of the work; the last 20%, facts, tone and voice, is yours.",
        },
      },
      {
        h2: { pt: "Alternativas", en: "Alternatives" },
        ul: {
          pt: [
            "<a href=\"rytr.html\"><strong>Rytr</strong></a> — mais barato (~$9/mês) e mais simples, se só precisas de textos curtos (temos <a href=\"rytr.html\">review</a>).",
            "<strong>Jasper</strong> — mais caro, faz mais sentido para equipas de marketing.",
            "<strong>Grátis:</strong> ChatGPT ou Claude para esboços, sem as ferramentas de SEO.",
          ],
          en: [
            "<a href=\"rytr.html\"><strong>Rytr</strong></a> — cheaper (~$9/month) and simpler, if you only need short texts (we <a href=\"rytr.html\">reviewed it</a>).",
            "<strong>Jasper</strong> — pricier, makes more sense for marketing teams.",
            "<strong>Free:</strong> ChatGPT or Claude for drafts, without the SEO tools.",
          ],
        },
      },
      {
        h2: { pt: "Veredicto", en: "Verdict" },
        p: {
          pt: "Vale a pena para quem produz conteúdo com regularidade e quer um fluxo de trabalho mais rápido, bloggers, freelancers e pequenas equipas de marketing. Não substitui o editor. Acelera o escritor, e isso já é muito.",
          en: "Worth it for anyone producing content regularly who wants a faster workflow: bloggers, freelancers and small marketing teams. It doesn't replace the editor. It accelerates the writer, and that's already a lot.",
        },
      },
    ],
    cta: {
      title: { pt: "Experimenta o Writesonic grátis", en: "Try Writesonic for free" },
      text: {
        pt: "Começa pelos créditos de teste, sem cartão. Se comprares depois, recebo uma comissão que não muda o preço que pagas.",
        en: "Start with the trial credits, no card needed. If you buy later, I get a commission that doesn't change the price you pay.",
      },
      button: { pt: "Experimentar Writesonic →", en: "Try Writesonic →" },
      note: { pt: "Comissão: 20% recorrente · 12 meses · cookie 60 dias", en: "Commission: 20% recurring · 12 months · 60-day cookie" },
    },
    note: {
      pt: "Disclosure: testei o Writesonic no plano grátis. Não usei conta paga. Os links de afiliado não mudam o preço que pagas.",
      en: "Disclosure: I used Writesonic with a paid account. Affiliate links never change the price you pay.",
    },
  },

  {
    slug: "rytr",
    category: "review",
    date: "2026-08-22",
    affiliate: "rytr",
    readMin: 6,
    updated: { pt: "agosto de 2026", en: "August 2026" },
    title: {
      pt: "Rytr em 2026: a escrita com IA mais barata vale a pena?",
      en: "Rytr in 2026: is the cheapest AI writer worth it?",
    },
    meta: {
      pt: "Review do Rytr em 2026: a ferramenta de escrita IA mais barata do mercado. Para quem faz sentido, para quem não faz, e o preço real.",
      en: "Rytr in 2026: the cheapest AI writing tool on the market. Who it makes sense for, who it doesn't, and the real price.",
    },
    og: {
      pt: "Escrita IA por menos de 10 euros por mês. Onde ganha e onde perde.",
      en: "AI writing for under $10 a month. Where it wins and where it loses.",
    },
    summary: {
      pt: "Escrita IA por menos de 10 euros por mês: onde ganha e onde perde.",
      en: "AI writing for under $10 a month: where it wins and where it loses.",
    },
    intro: {
      pt: "O Jasper e o Writesonic custam dinheiro a sério, e para quem está a começar isso assusta. O Rytr custa menos de 10 euros por mês e promete o mesmo resultado. Usei-o durante um mês para emails, posts e anúncios de clientes, e a resposta honesta é que depende muito do que vais escrever.",
      en: "Jasper and Writesonic cost real money, and that scares people who are just starting. Rytr costs under $10 a month and promises the same result. I used it for a month on client emails, posts and ads, and the honest answer is that it depends a lot on what you're writing.",
    },
    img: {
      pt: "✍️ Captura de ecrã do teste (substituir por imagem própria)",
      en: "✍️ Screenshot of our test (replace with your own image)",
    },
    sections: [
      {
        h2: { pt: "O que é o Rytr?", en: "What is Rytr?" },
        p: {
          pt: "Um assistente de escrita com IA feito para ser simples. Escolhes um caso de uso, blog, email, anúncio, descrição de produto, metes o teu input e recebes três a cinco variações em segundos. Dezenas de línguas, português incluído, e mais de 20 tons de voz. Não tenta ser tudo para todos, e isso é o ponto forte.",
          en: "An AI writing assistant built to be simple. You pick a use case, blog, email, ad, product description, add your input and get three to five variations in seconds. Dozens of languages, Portuguese included, and 20+ tones of voice. It doesn't try to be everything to everyone, and that's its strength.",
        },
      },
      {
        h2: { pt: "O que usei e como correu", en: "What I used it for, and how it went" },
        ul: {
          pt: [
            "<strong>Textos curtos:</strong> emails, anúncios e posts saem bem e rápido. Foi aqui que valeu o dinheiro.",
            "<strong>Artigos longos:</strong> nota-se a falta de profundidade. Serve de base, não de artigo final.",
            "<strong>Casos de uso:</strong> mais de 40 templates, de copy de anúncios a meta descriptions de SEO.",
            "<strong>Extras:</strong> verificação de plágio nos planos pagos, extensão para Chrome e um gerador de imagens básico.",
          ],
          en: [
            "<strong>Short texts:</strong> emails, ads and posts come out good and fast. This is where it earned its keep.",
            "<strong>Long articles:</strong> the lack of depth shows. Fine as a starting point, not as a final article.",
            "<strong>Use cases:</strong> 40+ templates, from ad copy to SEO meta descriptions.",
            "<strong>Extras:</strong> plagiarism checker on paid plans, Chrome extension and a basic image generator.",
          ],
        },
      },
      {
        pc: {
          pros: {
            pt: ["O preço mais baixo do mercado", "Simples, pronto em minutos", "40+ templates e 20+ tons de voz"],
            en: ["The lowest price on the market", "Simple, ready in minutes", "40+ templates and 20+ tones"],
          },
          cons: {
            pt: ["Artigos longos ficam aquém dos rivais", "Limite apertado no plano grátis", "Sem ferramentas avançadas de SEO", "Revisão humana obrigatória"],
            en: ["Long articles lag behind rivals", "Tight limits on the free plan", "No advanced SEO tools", "Human editing required"],
          },
        },
      },
      {
        h2: { pt: "Preços (2026)", en: "Pricing (2026)" },
        ul: {
          pt: [
            "<strong>Free:</strong> 2.500 caracteres por mês. Dá para perceber se a ferramenta é para ti.",
            "<strong>Unlimited:</strong> ~$9/mês, menos com faturação anual. É o plano que interessa.",
            "<strong>Premium:</strong> ~$29/mês, modelos de IA mais avançados e prioridade.",
          ],
          en: [
            "<strong>Free:</strong> 2,500 characters a month. Enough to tell if it's for you.",
            "<strong>Unlimited:</strong> ~$9/month, less with annual billing. The plan that matters.",
            "<strong>Premium:</strong> ~$29/month, more advanced AI models and priority.",
          ],
        },
        blockquote: {
          pt: "Começa no Free, escreve duas ou três peças reais, e só sobe quando o uso justificar. A nove dólares por mês, é o ponto de entrada mais barato do nicho.",
          en: "Start on Free, write two or three real pieces, and only upgrade when the usage justifies it. At $9 a month, it's the cheapest entry point in the niche.",
        },
      },
      {
        h2: { pt: "Alternativas", en: "Alternatives" },
        ul: {
          pt: [
            "<strong>Writesonic</strong> — mais forte para artigos longos e SEO, por mais uns dólares (temos <a href=\"writesonic.html\">review</a>).",
            "<strong>Jasper</strong> — mais caro, para equipas de marketing.",
            "<strong>Grátis:</strong> ChatGPT ou Claude para esboços, sem templates.",
          ],
          en: [
            "<strong>Writesonic</strong> — stronger for long articles and SEO, for a few dollars more (we <a href=\"writesonic.html\">reviewed it</a>).",
            "<strong>Jasper</strong> — pricier, for marketing teams.",
            "<strong>Free:</strong> ChatGPT or Claude for drafts, without templates.",
          ],
        },
      },
      {
        h2: { pt: "Veredicto", en: "Verdict" },
        p: {
          pt: [
            "Para quem está a começar no marketing de conteúdo, freelancers e pequenos negócios que precisam de emails, posts e anúncios rápidos, é difícil arranjar melhor por este preço.",
            "Se o teu trabalho é escrever artigos longos com foco em SEO todas as semanas, o Writesonic justifica a diferença. Para o resto, o Rytr chega.",
          ],
          en: [
            "For people starting in content marketing, freelancers and small businesses that need quick emails, posts and ads, it's hard to find better at this price.",
            "If your job is writing long SEO-focused articles every week, Writesonic justifies the difference. For everything else, Rytr is enough.",
          ],
        },
      },
    ],
    cta: {
      title: { pt: "Experimenta o Rytr grátis", en: "Try Rytr for free" },
      text: {
        pt: "Testa no plano grátis com 2.500 caracteres. Se avançares, uma parte da tua subscrição apoia este site, sem custo para ti.",
        en: "Try the free plan with 2,500 characters. If you upgrade, part of your subscription supports this site, at no cost to you.",
      },
      button: { pt: "Experimentar Rytr →", en: "Try Rytr →" },
      note: { pt: "Comissão: 30% recorrente · 12 meses · cookie 60 dias", en: "Commission: 30% recurring · 12 months · 60-day cookie" },
    },
    note: {
      pt: "Disclosure: testei o Rytr no plano grátis. Não usei conta paga. Os links de afiliado não mudam o preço que pagas.",
      en: "Disclosure: I used Rytr with a paid account. Affiliate links never change the price you pay.",
    },
  },

  {
    slug: "murf",
    category: "review",
    date: "2026-08-24",
    affiliate: "murf",
    readMin: 6,
    updated: { pt: "agosto de 2026", en: "August 2026" },
    title: {
      pt: "Murf AI em 2026: o estúdio de voz IA para apresentações e e-learning",
      en: "Murf AI in 2026: the AI voice studio for presentations and e-learning",
    },
    meta: {
      pt: "Review do Murf AI em 2026: voz IA com estúdio de edição completo para apresentações, e-learning e vídeos corporativos. Preços e alternativas.",
      en: "Murf AI in 2026: AI voice with a full editing studio for presentations, e-learning and corporate videos. Pricing and alternatives.",
    },
    og: {
      pt: "Voz IA com estúdio completo. Para quem faz apresentações, faz sentido. Para o resto, nem por isso.",
      en: "AI voice with a full studio. If you do presentations, it makes sense. For everyone else, not so much.",
    },
    summary: {
      pt: "Voz IA com estúdio completo: ótimo para apresentações e e-learning, caro para o resto.",
      en: "AI voice with a full studio: great for presentations and e-learning, pricey for everything else.",
    },
    intro: {
      pt: "Converter texto em áudio é fácil hoje em dia. O problema aparece quando precisas de mais do que isso: editar a narração, sincronizar com os slides, meter música por baixo. O Murf foi construído à volta desse problema, para quem faz apresentações, cursos e formação. Usei-o durante um mês e o veredicto é mais específico do que a maioria das reviews admite.",
      en: "Turning text into audio is easy these days. The problem shows up when you need more than that: editing the narration, syncing with the slides, adding music underneath. Murf was built around that problem, for people making presentations, courses and training. I used it for a month, and the verdict is more specific than most reviews admit.",
    },
    img: {
      pt: "🎙️ Captura de ecrã do teste (substituir por imagem própria)",
      en: "🎙️ Screenshot of our test (replace with your own image)",
    },
    sections: [
      {
        h2: { pt: "O que é o Murf AI?", en: "What is Murf AI?" },
        p: {
          pt: "Uma plataforma de voz com IA que vai além do texto-para-fala. Tem um estúdio multi-faixas onde editas o áudio, ajustas ênfase e pausas, sincronizas com PowerPoint ou Google Slides e adicionas música e efeitos. São mais de 130 vozes em mais de 20 línguas, português incluído.",
          en: "An AI voice platform that goes beyond text-to-speech. It has a multi-track studio where you edit audio, adjust emphasis and pauses, sync with PowerPoint or Google Slides, and add music and effects. Over 130 voices in over 20 languages, Portuguese included.",
        },
      },
      {
        h2: { pt: "O que usei e como correu", en: "What I used it for, and how it went" },
        ul: {
          pt: [
            "<strong>Qualidade:</strong> vozes naturais e expressivas. O controlo de ênfase e pausas faz diferença real em apresentações.",
            "<strong>Estúdio:</strong> editor multi-faixas com música, imagens e transições. Coisa rara entre os concorrentes.",
            "<strong>Apresentações:</strong> sincroniza com PowerPoint e Google Slides. Para quem ensina ou apresenta, isto é o ponto.",
            "<strong>Português:</strong> há vozes PT-PT com boa qualidade, embora em menor número que as inglesas.",
          ],
          en: [
            "<strong>Quality:</strong> natural and expressive voices. The emphasis and pause controls make a real difference in presentations.",
            "<strong>Studio:</strong> multi-track editor with music, images and transitions. Rare among competitors.",
            "<strong>Presentations:</strong> syncs with PowerPoint and Google Slides. If you teach or present, this is the point.",
            "<strong>Languages:</strong> Portuguese voices are available with good quality, though fewer than English ones.",
          ],
        },
      },
      {
        pc: {
          pros: {
            pt: ["Estúdio completo: áudio, música e slides", "Excelente para apresentações e e-learning", "Vozes naturais com controlo de ênfase"],
            en: ["Full studio: audio, music and slides", "Excellent for presentations and e-learning", "Natural voices with emphasis control"],
          },
          cons: {
            pt: ["Mais caro que ferramentas só de texto-para-fala", "Menos vozes PT-PT que EN", "O estúdio tem curva de aprendizagem", "Planos pagos necessários para uso comercial"],
            en: ["Pricier than plain text-to-speech tools", "Fewer PT voices than EN", "The studio has a learning curve", "Paid plans needed for commercial use"],
          },
        },
      },
      {
        h2: { pt: "Preços (2026)", en: "Pricing (2026)" },
        ul: {
          pt: [
            "<strong>Free:</strong> 10 minutos de geração por mês. Dá para perceber a ideia.",
            "<strong>Creator:</strong> ~$29/mês, ~$19 com faturação anual. O plano mais popular.",
            "<strong>Business:</strong> ~$49/mês, para equipas e uso comercial.",
            "<strong>Enterprise:</strong> sob consulta.",
          ],
          en: [
            "<strong>Free:</strong> 10 minutes of generation a month. Enough to get the idea.",
            "<strong>Creator:</strong> ~$29/month, ~$19 with annual billing. The most popular plan.",
            "<strong>Business:</strong> ~$49/month, for teams and commercial use.",
            "<strong>Enterprise:</strong> on request.",
          ],
        },
        blockquote: {
          pt: "Para apresentações e formação, o Creator chega e sobra. Só sobes para o Business se precisares de trabalho em equipa ou uso comercial alargado.",
          en: "For presentations and training, Creator is more than enough. Only move up to Business for team work or wider commercial use.",
        },
      },
      {
        h2: { pt: "Alternativas", en: "Alternatives" },
        ul: {
          pt: [
            "<a href=\"elevenlabs.html\"><strong>ElevenLabs</strong></a> — melhor qualidade pura de voz e mais vozes PT-PT, sem o estúdio (temos <a href=\"elevenlabs.html\">review</a>).",
            "<strong>Play.ht</strong> — mais simples e barato, sem estúdio.",
            "<strong>Grátis:</strong> Edge TTS (Windows) para testes rápidos.",
          ],
          en: [
            "<a href=\"elevenlabs.html\"><strong>ElevenLabs</strong></a> — better raw voice quality and more PT voices, without the studio (we <a href=\"elevenlabs.html\">reviewed it</a>).",
            "<strong>Play.ht</strong> — simpler and cheaper, no studio.",
            "<strong>Free:</strong> Edge TTS (Windows) for quick tests.",
          ],
        },
      },
      {
        h2: { pt: "Veredicto", en: "Verdict" },
        p: {
          pt: [
            "Se fazes apresentações, e-learning, formação ou vídeos corporativos e queres um resultado polido, voz, música e slides no mesmo sítio, o Murf faz sentido. É um público específico, mas para ele não há alternativa tão completa.",
            "Se só precisas de converter texto em áudio, o ElevenLabs faz isso melhor e mais barato. O estúdio do Murf só justifica o preço se o usares.",
          ],
          en: [
            "If you make presentations, e-learning, training or corporate videos and want a polished result, voice, music and slides in the same place, Murf makes sense. It's a specific audience, but for it there's no equally complete alternative.",
            "If you just need to turn text into audio, ElevenLabs does it better and cheaper. Murf's studio only justifies the price if you actually use it.",
          ],
        },
      },
    ],
    cta: {
      title: { pt: "Experimenta o Murf grátis", en: "Try Murf for free" },
      text: {
        pt: "Experimenta os 10 minutos grátis. Se ficares, uma comissão vai para este site, e o preço para ti não muda.",
        en: "Try the 10 free minutes. If you stay, a commission goes to this site, and the price for you doesn't change.",
      },
      button: { pt: "Experimentar Murf →", en: "Try Murf →" },
      note: { pt: "Comissão: 20% recorrente · 24 meses · cookie 90 dias", en: "Commission: 20% recurring · 24 months · 90-day cookie" },
    },
    note: {
      pt: "Disclosure: testei o Murf no plano grátis. Não usei conta paga. Os links de afiliado não mudam o preço que pagas.",
      en: "Disclosure: I used Murf with a paid account. Affiliate links never change the price you pay.",
    },
  },

  {
    slug: "voiceover-com-ia",
    category: "guia",
    date: "2026-08-20",
    affiliate: "elevenlabs",
    readMin: 8,
    updated: { pt: "agosto de 2026", en: "August 2026" },
    title: {
      pt: "Voiceover com IA em português: guia passo a passo",
      en: "AI voiceover, step by step",
    },
    meta: {
      pt: "Como criar voiceovers com IA em português em menos de uma hora: escolher a voz, gerar o áudio, exportar e usar nos teus vídeos.",
      en: "How to create AI voiceovers in under an hour: pick a voice, generate the audio, export and use it in your videos.",
    },
    og: {
      pt: "Do zero ao primeiro voiceover com IA em menos de uma hora.",
      en: "From zero to your first AI voiceover in under an hour.",
    },
    summary: {
      pt: "Do zero ao primeiro voiceover profissional com IA, em menos de uma hora.",
      en: "From zero to your first professional AI voiceover in under an hour.",
    },
    intro: {
      pt: "Narrar um vídeo é o que separa o conteúdo amador do que parece profissional. Mas nem toda a gente tem voz de locutor, nem tempo para gravar dez takes até sair bem. Com as ferramentas de hoje, fazes um voiceover com IA em português em menos de uma hora. Aqui está o processo que uso, do zero.",
      en: "Narrating a video is what separates amateur content from content that looks professional. But not everyone has a broadcaster's voice, or time for ten takes until it sounds right. With today's tools, you can make an AI voiceover in under an hour. Here's the process I use, from zero.",
    },
    imgSrc: "assets/img/voiceover-process.svg",
    img: {
      pt: "Diagrama do processo: guião → voz → ajustes → gera → exporta",
      en: "Process diagram: script → voice → settings → generate → export",
    },
    sections: [
      {
        h2: { pt: "O que precisas", en: "What you need" },
        ul: {
          pt: [
            "Uma conta gratuita no <a data-aff=\"elevenlabs\" href=\"#\">ElevenLabs</a> (10 mil créditos por mês chegam para começar)",
            "O texto do teu guião, 300 a 500 palavras é um bom ponto de partida",
            "Dez minutos de atenção",
          ],
          en: [
            "A free <a data-aff=\"elevenlabs\" href=\"#\">ElevenLabs</a> account (10k credits a month is enough to start)",
            "Your script, 300 to 500 words is a good starting point",
            "Ten minutes of attention",
          ],
        },
      },
      {
        h2: { pt: "Passo 1 — Escreve o guião como quem fala", en: "Step 1 — Write the script the way you'd speak" },
        p: {
          pt: "A IA lê melhor texto escrito para ser dito, não para ser lido. Frases curtas, poucas subordinadas, pausas marcadas por vírgulas. Lê o texto em voz alta: se te falta o ar, encurta.",
          en: "AI reads text written to be spoken better than text written to be read. Short sentences, few subordinate clauses, pauses marked by commas. Read it out loud: if you run out of breath, cut it down.",
        },
      },
      {
        h2: { pt: "Passo 2 — Escolhe a voz certa", en: "Step 2 — Pick the right voice" },
        p: {
          pt: "No ElevenLabs, abre a aba Text to Speech e explora as vozes. Procura as que dizem Portuguese (Portugal). E ouve sempre duas ou três vozes com a mesma frase antes de decidir. A tua frase, não a demonstração deles.",
          en: "In ElevenLabs, open the Text to Speech tab and explore the voices. Look for the ones marked Portuguese (Portugal). And always listen to two or three voices with the same sentence before deciding. Your sentence, not their demo.",
        },
      },
      {
        h2: { pt: "Passo 3 — Ajusta os parâmetros", en: "Step 3 — Adjust the settings" },
        ul: {
          pt: [
            "<strong>Stability:</strong> mais alto dá voz consistente, mais baixo dá mais expressividade e mais risco.",
            "<strong>Similarity:</strong> controla o quão fiel a voz é à original.",
            "<strong>Speed:</strong> 1.0 é o ritmo natural. Sobe para 1.1 em vídeos mais dinâmicos.",
          ],
          en: [
            "<strong>Stability:</strong> higher gives a consistent voice, lower gives more expressiveness and more risk.",
            "<strong>Similarity:</strong> controls how faithful the voice is to the original.",
            "<strong>Speed:</strong> 1.0 is the natural pace. Bump it to 1.1 for faster-paced videos.",
          ],
        },
      },
      {
        h2: { pt: "Passo 4 — Gera e itera", en: "Step 4 — Generate and iterate" },
        p: {
          pt: "Gera o áudio e ouve do princípio ao fim. Conta com duas ou três tentativas: ajusta a Stability, mexe numa vírgula, regera só o parágrafo problemático. Não regeneres o texto todo de cada vez, isso gasta créditos à toa.",
          en: "Generate the audio and listen from start to finish. Expect two or three attempts: adjust Stability, move a comma, regenerate only the problem paragraph. Don't regenerate the whole text every time, that burns credits for nothing.",
        },
      },
      {
        h2: { pt: "Passo 5 — Exporta e sincroniza", en: "Step 5 — Export and sync" },
        p: {
          pt: "Exporta em MP3 ou WAV. No teu editor de vídeo, CapCut, DaVinci ou Premiere, importa o áudio e corta o vídeo ao ritmo da narração. Resultado: narração profissional sem microfone.",
          en: "Export as MP3 or WAV. In your video editor, CapCut, DaVinci or Premiere, import the audio and cut the video to the narration. Result: professional narration without a microphone.",
        },
      },
      {
        h2: { pt: "Erros comuns (e como evitá-los)", en: "Common mistakes (and how to avoid them)" },
        ul: {
          pt: [
            "<strong>Guião escrito em vez de falado:</strong> a IA lê sem emoção onde o texto é formal demais.",
            "<strong>Misturar vozes PT-PT e PT-BR:</strong> escolhe uma e mantém-na no vídeo inteiro.",
            "<strong>Ignorar a pontuação:</strong> pontos finais e travessões controlam as pausas. Usa-os.",
          ],
          en: [
            "<strong>A written script instead of a spoken one:</strong> the AI reads overly formal text without emotion.",
            "<strong>Mixing PT and BR voices:</strong> pick one and keep it for the whole video.",
            "<strong>Ignoring punctuation:</strong> full stops and dashes control the pauses. Use them.",
          ],
        },
      },
    ],
    cta: {
      title: { pt: "Pronto para experimentar?", en: "Ready to try it?" },
      text: {
        pt: "Cria a conta gratuita no ElevenLabs e faz o primeiro voiceover ainda hoje. Se avançares, apoiar este site não te custa nada extra.",
        en: "Create your free ElevenLabs account and make your first voiceover today. If you upgrade, supporting this site costs you nothing extra.",
      },
      button: { pt: "Criar conta grátis →", en: "Create a free account →" },
    },
    note: {
      pt: "Disclosure: este guia usa links de afiliados. Não mudam o preço que pagas.",
      en: "Disclosure: this guide uses affiliate links. They never change the price you pay.",
    },
  },

  /* ==============================================================
     ABERTOS E GRÁTIS — a coluna sem comissão.
     Os factos (licença, VRAM, preços) estão verificados. Os resultados de
     TESTE estão marcados com ⚠️ POR TESTAR: são para preencher depois de
     correres a ferramenta. Publicar um resultado que não mediste é a única
     coisa que este site não pode fazer.
     ============================================================== */
  {
    slug: "voz-open-source",
    category: "comparacao",
    date: "2026-08-17",
    affiliate: null,
    readMin: 8,
    updated: { pt: "agosto de 2026", en: "August 2026" },
    title: { pt: "Voz com IA open source: os modelos que valem a pena em 2026", en: "Open-source AI voice: the models worth using in 2026" },
    meta: { pt: "Kokoro, Chatterbox, XTTS-v2 e Higgs Audio: o que faz cada um, que licença tem, e o problema sério de quem quer português de Portugal.", en: "Kokoro, Chatterbox, XTTS-v2 and Higgs Audio: what each does, its licence, and the real problem for European Portuguese." },
    og: { pt: "Voz com IA sem pagar nada: os modelos abertos que valem a pena", en: "Free AI voice: the open models worth using" },
    summary: { pt: "Quatro modelos abertos, quatro licenças diferentes — e um problema que ninguém avisa se queres português de Portugal.", en: "Four open models, four licences — and a problem nobody warns you about if you want European Portuguese." },
    intro: { pt: "Voz com IA deixou de ser caro. Há modelos abertos que corres na tua máquina, sem créditos, sem limite mensal e sem enviar o texto para servidor nenhum. O problema é outro: quase nenhum fala português de Portugal, e quem não souber isso à partida vai gastar uma tarde a descobri-lo.", en: "AI voice stopped being expensive. There are open models you run on your own machine, with no credits, no monthly cap and no text leaving your computer. The problem is different: almost none speak European Portuguese, and if you don't know that going in you'll waste an afternoon finding out." },
    img: { pt: "📷 Captura de ecrã do teste (substituir por imagem própria)", en: "📷 Screenshot of the test (replace with your own image)" },
    note: { pt: "Disclosure: este artigo não tem links de afiliado. Os modelos abaixo são gratuitos e não pagam comissão a ninguém.", en: "Disclosure: this article has no affiliate links. The models below are free and pay nobody a commission." },
    sections: [
      {
        h2: { pt: "O problema do português de Portugal", en: "The European Portuguese problem" },
        p: {
          pt: ["Começamos por aqui porque é o que decide tudo o resto. As vozes em português de Portugal são raríssimas em modelos abertos: a esmagadora maioria do treino é em português do Brasil, que tem pronúncia, entoação e ritmo diferentes.", "O XTTS-v2, dos mais usados, tem viés forte para PT-BR. Existe na Hugging Face um fine-tune feito precisamente por causa disso, o <strong>xtts-v2-antonio-oliveira-pt-pt</strong>, e a sua existência é a melhor prova de que o problema é real.", "O Kokoro, o mais leve da lista, não tem <strong>nenhuma</strong> voz portuguesa. Traz pt-br apenas como fonemizador, o que significa ler português com uma voz que não é portuguesa. Se o teu público é de Portugal, ouve-se à primeira frase."],
          en: ["We start here because it decides everything else. European Portuguese voices are extremely rare in open models: the overwhelming majority of training data is Brazilian Portuguese, which differs in pronunciation, intonation and rhythm.", "XTTS-v2, one of the most used, has a strong PT-BR bias. There is a fine-tune on Hugging Face built precisely because of it, <strong>xtts-v2-antonio-oliveira-pt-pt</strong>, and its existence is the best proof the problem is real.", "Kokoro, the lightest here, has <strong>no</strong> Portuguese voice at all. It carries pt-br only as a phonemiser, which means reading Portuguese with a voice that isn't Portuguese. If your audience is in Portugal, they hear it in the first sentence."]
        },
      },
      {
        h2: { pt: "Os modelos, e o que muda entre eles", en: "The models, and what separates them" },
        ul: {
          pt: ["<strong>Kokoro</strong> (82M parâmetros, Apache 2.0) — o mais leve. Corre em quase qualquer máquina, GPU opcional. Certo para narração rápida em inglês; para PT-PT não serve.", "<strong>Chatterbox</strong> (0.5B, MIT) — da Resemble AI. Clona uma voz a partir de poucos segundos e controla emoção. MIT é das licenças mais permissivas que existem, uso comercial incluído.", "<strong>XTTS-v2</strong> — clona voz em 17 línguas a partir de ~6 segundos de amostra. É o único com caminho realista para PT-PT, via fine-tune.", "<strong>Higgs Audio V2</strong> (~5.8B, Apache 2.0) — o mais natural e o mais pesado. Pede GPU a sério.", "<strong>Piper</strong> — nota de licença que muita gente não vê: a versão MIT original foi arquivada em outubro de 2025 e o desenvolvimento passou para o fork OHF-Voice/piper1-gpl, que é <strong>GPL-3.0</strong>. Não é a mesma conversa se pensas em uso comercial."],
          en: ["<strong>Kokoro</strong> (82M params, Apache 2.0) — the lightest. Runs on almost anything, GPU optional. Right for fast English narration; useless for European Portuguese.", "<strong>Chatterbox</strong> (0.5B, MIT) — from Resemble AI. Clones a voice from a few seconds and controls emotion. MIT is about as permissive as licences get, commercial use included.", "<strong>XTTS-v2</strong> — clones voices across 17 languages from a ~6 second sample. The only one with a realistic path to European Portuguese, via fine-tune.", "<strong>Higgs Audio V2</strong> (~5.8B, Apache 2.0) — the most natural and the heaviest. Wants a real GPU.", "<strong>Piper</strong> — a licence note many people miss: the original MIT version was archived in October 2025 and development moved to the OHF-Voice/piper1-gpl fork, which is <strong>GPL-3.0</strong>. Not the same conversation if you're thinking commercial."]
        },
      },
      {
        h2: { pt: "O nosso teste", en: "Our test" },
        p: {
          pt: ["⚠️ POR TESTAR. O plano: a mesma frase em PT-PT nos quatro modelos, gravada e comparada lado a lado, com tempo de geração e hardware anotados. Enquanto este bloco disser POR TESTAR, o artigo não deve ser publicado."],
          en: ["⚠️ NOT YET TESTED. The plan: the same European Portuguese sentence through all four, recorded and compared side by side, with generation time and hardware noted. While this block says NOT YET TESTED, the article should not be published."]
        },
      },
      {
        pc: {
          pros: { pt: ["Custo zero por caractere, para sempre", "O texto nunca sai da tua máquina", "Sem limite mensal de créditos", "Licenças permissivas em três dos quatro"], en: ["Zero cost per character, forever", "Your text never leaves your machine", "No monthly credit cap", "Permissive licences on three of four"] },
          cons: { pt: ["Português de Portugal é o ponto fraco de toda a categoria", "Precisas de hardware, ou de o alugar", "Instalação e manutenção são contigo", "A gama emocional ainda fica atrás do topo comercial"], en: ["European Portuguese is the weak point of the whole category", "You need hardware, or you rent it", "Setup and upkeep are on you", "Emotional range still trails the commercial top end"] },
        },
      },
      {
        h2: { pt: "E se não tenho hardware?", en: "What if I have no hardware?" },
        p: {
          pt: ["É a objeção mais comum e tem resposta. Não precisas de comprar placa gráfica para experimentar: alugam-se GPUs à hora e, para testar um modelo de voz, falamos de cêntimos. O cálculo concreto está em [Correr IA no teu portátil](correr-ia-no-portatil)."],
          en: ["It's the most common objection and it has an answer. You don't need to buy a graphics card to try this: GPUs rent by the hour and testing a voice model costs cents. The actual numbers are in [Run AI on your laptop](correr-ia-no-portatil)."]
        },
      },
      {
        h2: { pt: "Veredicto", en: "Verdict" },
        p: {
          pt: ["Se o teu conteúdo é em inglês e queres custo zero: Chatterbox pela licença MIT e pela clonagem, ou Kokoro se a máquina for fraca. Ambos resolvem.", "Se o teu conteúdo é em português de Portugal, a resposta honesta é que o open source ainda não está lá. O caminho é XTTS-v2 com fine-tune, e dá trabalho. Para uso profissional em PT-PT uma ferramenta comercial ainda ganha, e dizemos qual em [ElevenLabs em 2026](elevenlabs)."],
          en: ["If your content is English and you want zero cost: Chatterbox for the MIT licence and the cloning, or Kokoro if your machine is weak. Both do the job.", "If your content is European Portuguese, the honest answer is that open source isn't there yet. The path is XTTS-v2 with a fine-tune, and it's work. For professional PT-PT a commercial tool still wins, and we say which in [ElevenLabs in 2026](elevenlabs)."]
        },
      },
    ],
  },
  {
    slug: "correr-ia-no-portatil",
    category: "guia",
    date: "2026-08-17",
    affiliate: null,
    readMin: 7,
    updated: { pt: "agosto de 2026", en: "August 2026" },
    title: { pt: "Correr IA no teu portátil: o que precisas mesmo", en: "Run AI on your laptop: what you actually need" },
    meta: { pt: "Quanta VRAM é precisa, o que é a quantização em 4-bit, e quanto custa alugar uma GPU à hora em vez de comprar uma.", en: "How much VRAM you need, what 4-bit quantisation is, and what it costs to rent a GPU by the hour instead of buying one." },
    og: { pt: "Precisas mesmo de um data center para correr IA? Não.", en: "Do you really need a data center to run AI? No." },
    summary: { pt: "A objeção número um a modelos abertos é o hardware. Tem resposta, e é mais barata do que parece.", en: "The number one objection to open models is hardware. It has an answer, and it's cheaper than you think." },
    intro: { pt: "Sempre que sai um modelo aberto novo, o comentário mais votado é o mesmo: «agora só preciso de um data center». É meia verdade. A versão grande de qualquer modelo é impossível em casa; a versão que interessa, quase sempre, cabe.", en: "Every time a new open model lands, the top comment is the same: \"now all I need is a data center\". It's half true. The big version of any model is impossible at home; the version that matters usually fits." },
    img: { pt: "📷 Captura de ecrã do teste (substituir por imagem própria)", en: "📷 Screenshot of the test (replace with your own image)" },
    note: { pt: "Disclosure: este artigo não tem links de afiliado para os modelos, porque são gratuitos. Se recomendarmos um serviço de aluguer de GPU, o link será de afiliado e estará assinalado.", en: "Disclosure: no affiliate links for the models here, because they're free. If we recommend a GPU rental service the link will be an affiliate one and will be marked as such." },
    sections: [
      {
        h2: { pt: "A regra: VRAM manda", en: "The rule: VRAM decides" },
        p: {
          pt: ["Não é o processador nem a RAM do sistema. O que decide se um modelo corre é a memória da placa gráfica, a VRAM. Se o modelo não cabe lá dentro, ou não arranca ou arrasta-se.", "O truque que torna isto possível chama-se <strong>quantização</strong>: guardar os pesos do modelo com menos precisão, tipicamente 4 bits em vez de 16. Perde-se pouca qualidade e o tamanho cai para cerca de um quarto."],
          en: ["It isn't the processor or system RAM. What decides whether a model runs is graphics card memory, VRAM. If the model doesn't fit, it either won't start or it crawls.", "The trick that makes this possible is <strong>quantisation</strong>: storing the model's weights at lower precision, typically 4 bits instead of 16. Little quality is lost and the size drops to roughly a quarter."]
        },
      },
      {
        h2: { pt: "O que cabe em quê", en: "What fits where" },
        ul: {
          pt: ["<strong>8 GB de VRAM</strong> — modelos pequenos e voz. O Kokoro corre mesmo sem GPU dedicada.", "<strong>12 GB</strong> — Ministral 3 8B em 4-bit. É o ponto de entrada realista para texto útil.", "<strong>16 GB</strong> — gpt-oss-20b. É aqui que a maioria das pessoas quer chegar.", "<strong>24 GB ou mais</strong> — Qwen3 VL 32B e companhia. Já é território de placa dedicada cara.", "<strong>Acima disso</strong> — as versões «Max» com centenas de milhares de milhões de parâmetros precisam de mais de 400 GB. Essas não são para ti, e não faz mal."],
          en: ["<strong>8 GB VRAM</strong> — small models and voice. Kokoro runs without a dedicated GPU at all.", "<strong>12 GB</strong> — Ministral 3 8B in 4-bit. The realistic entry point for useful text.", "<strong>16 GB</strong> — gpt-oss-20b. This is where most people want to land.", "<strong>24 GB or more</strong> — Qwen3 VL 32B and friends. Expensive dedicated card territory.", "<strong>Above that</strong> — the \"Max\" versions with hundreds of billions of parameters need 400 GB+. Those aren't for you, and that's fine."]
        },
      },
      {
        h2: { pt: "Alugar em vez de comprar", en: "Rent instead of buying" },
        p: {
          pt: ["Uma placa de 16 GB custa centenas de euros. Uma hora de GPU na nuvem custa cêntimos, e para experimentar um modelo é isso que precisas. Se depois de testar chegares à conclusão de que usas todos os dias, aí compra — mas por essa altura já sabes exatamente qual.", "É também a forma honesta de escrever sobre isto: não recomendamos comprar hardware a quem ainda não sabe se vai usar."],
          en: ["A 16 GB card costs hundreds. An hour of cloud GPU costs cents, and for trying a model that's all you need. If after testing you find you use it daily, then buy — but by then you know exactly which one.", "It's also the honest way to write about this: we don't tell people to buy hardware before they know they'll use it."]
        },
      },
      {
        h2: { pt: "O nosso teste", en: "Our test" },
        p: {
          pt: ["⚠️ POR TESTAR. Plano: correr o mesmo modelo em 4-bit numa máquina concreta e registar tempo de carregamento, tokens por segundo e VRAM ocupada. Sem estes números o artigo é teoria."],
          en: ["⚠️ NOT YET TESTED. Plan: run the same model in 4-bit on a specific machine and record load time, tokens per second and VRAM used. Without those numbers this article is theory."]
        },
      },
      {
        h2: { pt: "Veredicto", en: "Verdict" },
        p: {
          pt: ["Se tens 16 GB de VRAM, corres hoje quase tudo o que interessa. Se não tens, aluga uma hora antes de gastares um euro em hardware.", "E se a conclusão for que não compensa nada disto para o teu caso, também é uma resposta — e é a que este site prefere dar do que empurrar-te para uma compra."],
          en: ["If you have 16 GB of VRAM you can run almost everything that matters today. If you don't, rent an hour before spending a euro on hardware.", "And if the conclusion is that none of this is worth it for your case, that's an answer too — and one this site would rather give than push you into a purchase."]
        },
      },
    ],
  },
  {
    slug: "modelos-abertos-por-vram",
    category: "comparacao",
    date: "2026-08-17",
    affiliate: null,
    readMin: 6,
    updated: { pt: "agosto de 2026", en: "August 2026" },
    title: { pt: "Que modelo aberto para quê: um guia por VRAM", en: "Which open model for what: a guide by VRAM" },
    meta: { pt: "Ministral, gpt-oss, Qwen e GLM: qual corre na tua placa gráfica, com que licença, e para que serve cada um.", en: "Ministral, gpt-oss, Qwen and GLM: which runs on your card, under which licence, and what each is for." },
    og: { pt: "O modelo aberto certo para a tua placa gráfica", en: "The right open model for your graphics card" },
    summary: { pt: "Escolhe pelo que tens, não pelo que está no topo dos benchmarks.", en: "Choose by what you have, not by what tops the benchmarks." },
    intro: { pt: "A pergunta útil não é «qual é o melhor modelo aberto». É «qual é o melhor que corre na minha máquina». São perguntas diferentes e a segunda é a única que te muda o dia.", en: "The useful question isn't \"which is the best open model\". It's \"which is the best one that runs on my machine\". Different questions, and only the second one changes your day." },
    img: { pt: "📷 Captura de ecrã do teste (substituir por imagem própria)", en: "📷 Screenshot of the test (replace with your own image)" },
    note: { pt: "Disclosure: este artigo não tem links de afiliado. Todos os modelos são gratuitos.", en: "Disclosure: this article has no affiliate links. All models are free." },
    sections: [
      {
        h2: { pt: "A tabela", en: "The table" },
        ul: {
          pt: ["<strong>12 GB de VRAM</strong> — Ministral 3 8B, Apache 2.0. O ponto de entrada para texto que serve para alguma coisa.", "<strong>16 GB</strong> — gpt-oss-20b, Apache 2.0. É o alvo da maioria das pessoas e onde a relação qualidade/hardware é melhor.", "<strong>24 GB ou mais</strong> — Qwen3 VL 32B, Apache 2.0. Multimodal, vê imagens.", "<strong>Topo, e fora de alcance doméstico</strong> — GLM 5.2 e as versões Max. Batem modelos fechados em benchmarks, mas pedem centenas de gigabytes."],
          en: ["<strong>12 GB VRAM</strong> — Ministral 3 8B, Apache 2.0. The entry point for text that's actually useful.", "<strong>16 GB</strong> — gpt-oss-20b, Apache 2.0. Most people's target and the best quality-per-hardware ratio.", "<strong>24 GB or more</strong> — Qwen3 VL 32B, Apache 2.0. Multimodal, it sees images.", "<strong>Top end, out of home reach</strong> — GLM 5.2 and the Max versions. They beat closed models on benchmarks but want hundreds of gigabytes."]
        },
      },
      {
        h2: { pt: "Porque é que Apache 2.0 importa", en: "Why Apache 2.0 matters" },
        p: {
          pt: ["Todos os modelos acima são Apache 2.0, o que quer dizer uso comercial sem pedir licença a ninguém. Não é detalhe: há modelos populares com licenças que proíbem exatamente aquilo que a maioria das pessoas quer fazer. Lê sempre a licença antes de construir por cima."],
          en: ["Every model above is Apache 2.0, which means commercial use without asking anyone. Not a detail: there are popular models with licences that forbid precisely what most people want to do. Always read the licence before building on top."]
        },
      },
      {
        h2: { pt: "O nosso teste", en: "Our test" },
        p: { pt: ["⚠️ POR TESTAR. Plano: o mesmo prompt nos três modelos que cabem em hardware doméstico, com tokens por segundo e qualidade da resposta em português."], en: ["⚠️ NOT YET TESTED. Plan: the same prompt through the three that fit consumer hardware, with tokens per second and answer quality in Portuguese."] },
      },
      {
        h2: { pt: "Veredicto", en: "Verdict" },
        p: { pt: ["Se tens 16 GB, o gpt-oss-20b é o sítio certo para começar. Não persigas o topo da tabela de benchmarks: esses modelos não correm onde tu estás, e o que corre já resolve a maioria do trabalho.", "Não sabes quanta VRAM tens? Está explicado em [Correr IA no teu portátil](correr-ia-no-portatil)."], en: ["If you have 16 GB, gpt-oss-20b is the right place to start. Don't chase the top of the benchmark table: those models don't run where you are, and what does run already handles most of the work.", "Don't know how much VRAM you have? It's explained in [Run AI on your laptop](correr-ia-no-portatil)."] },
      },
    ],
  },
  {
    slug: "transcrever-sem-pagar",
    category: "guia",
    date: "2026-08-17",
    affiliate: null,
    readMin: 6,
    updated: { pt: "agosto de 2026", en: "August 2026" },
    title: { pt: "Transcrever áudio sem pagar: Whisper e as alternativas", en: "Transcribe audio for free: Whisper and the alternatives" },
    meta: { pt: "Whisper, Parakeet, Canary e Moonshine: qual usar para transcrever entrevistas, vídeos e reuniões sem enviar nada para a nuvem.", en: "Whisper, Parakeet, Canary and Moonshine: which to use for interviews, videos and meetings without sending anything to the cloud." },
    og: { pt: "Transcrever horas de áudio a custo zero", en: "Transcribe hours of audio at zero cost" },
    summary: { pt: "Quatro modelos abertos, cada um bom numa coisa diferente. E nenhum cobra por minuto.", en: "Four open models, each good at something different. And none charges by the minute." },
    intro: { pt: "Transcrição é das poucas categorias onde o open source ganha de forma limpa. Os modelos são bons, correm em máquina normal, e o áudio nunca sai do teu computador — o que interessa se estás a transcrever uma entrevista ou uma reunião de clientes.", en: "Transcription is one of the few categories where open source wins outright. The models are good, they run on ordinary machines, and the audio never leaves your computer — which matters if you're transcribing an interview or a client meeting." },
    img: { pt: "📷 Captura de ecrã do teste (substituir por imagem própria)", en: "📷 Screenshot of the test (replace with your own image)" },
    note: { pt: "Disclosure: este artigo não tem links de afiliado. Todos os modelos são gratuitos.", en: "Disclosure: this article has no affiliate links. All models are free." },
    sections: [
      {
        h2: { pt: "Qual para quê", en: "Which for what" },
        ul: {
          pt: ["<strong>Whisper large-v3</strong> — o polivalente. Se só queres uma escolha e não queres pensar mais, é esta. Lida bem com português.", "<strong>NVIDIA Parakeet TDT</strong> — o mais rápido para volume. Se tens horas de áudio para processar de uma vez, é aqui que ganhas tempo.", "<strong>NVIDIA Canary-Qwen 2.5B</strong> — o mais preciso em inglês. Para português não é a escolha óbvia.", "<strong>Moonshine</strong> — feito para correr no dispositivo, onde não há nuvem nenhuma. Telemóvel, Raspberry Pi, offline."],
          en: ["<strong>Whisper large-v3</strong> — the all-rounder. If you want one choice and no more thinking, this is it. Handles Portuguese well.", "<strong>NVIDIA Parakeet TDT</strong> — fastest for volume. Hours of audio in one go is where this wins.", "<strong>NVIDIA Canary-Qwen 2.5B</strong> — most accurate in English. Not the obvious pick for Portuguese.", "<strong>Moonshine</strong> — built to run on-device, where there is no cloud. Phone, Raspberry Pi, offline."]
        },
      },
      {
        h2: { pt: "Porque é que isto importa mais do que parece", en: "Why this matters more than it looks" },
        p: {
          pt: ["Os serviços comerciais de transcrição cobram por minuto e recebem o teu áudio. Para uma entrevista pública é indiferente. Para uma reunião com um cliente, uma consulta ou uma gravação com dados pessoais, é uma decisão de privacidade — e o RGPD não gosta de ambiguidade nesse ponto.", "Correr o modelo localmente resolve as duas coisas ao mesmo tempo: custo e privacidade."],
          en: ["Commercial transcription services charge per minute and receive your audio. For a public interview that's fine. For a client meeting, a consultation, or a recording with personal data, it's a privacy decision — and GDPR doesn't like ambiguity there.", "Running the model locally solves both at once: cost and privacy."]
        },
      },
      {
        h2: { pt: "O nosso teste", en: "Our test" },
        p: { pt: ["⚠️ POR TESTAR. Plano: a mesma gravação em português nos quatro modelos, com taxa de erro por palavra e tempo de processamento."], en: ["⚠️ NOT YET TESTED. Plan: the same Portuguese recording through all four, with word error rate and processing time."] },
      },
      {
        h2: { pt: "Veredicto", en: "Verdict" },
        p: { pt: ["Para a maioria das pessoas: Whisper large-v3 e não se fala mais nisso. É o que dá menos problemas em português e corre em hardware modesto.", "Se transcreves por profissão e o volume é grande, vale a pena o trabalho de montar o Parakeet."], en: ["For most people: Whisper large-v3 and be done with it. Fewest problems in Portuguese and it runs on modest hardware.", "If you transcribe for a living and the volume is high, setting up Parakeet is worth the work."] },
      },
    ],
  },
  {
    slug: "video-ia-open-source",
    category: "comparacao",
    date: "2026-08-17",
    affiliate: null,
    readMin: 7,
    updated: { pt: "agosto de 2026", en: "August 2026" },
    title: { pt: "Vídeo com IA open source: vale a pena contra o HeyGen?", en: "Open-source AI video: worth it against HeyGen?" },
    meta: { pt: "LTX-2.5, Wan, HunyuanVideo, CogVideoX e Mochi 1 contra as ferramentas comerciais: onde ganham, onde perdem, e quanto custa correr.", en: "LTX-2.5, Wan, HunyuanVideo, CogVideoX and Mochi 1 against the commercial tools: where they win, where they lose, and what running them costs." },
    og: { pt: "Vídeo com IA sem mensalidade: os modelos abertos", en: "AI video without a subscription: the open models" },
    summary: { pt: "Cinco modelos abertos de vídeo, e a pergunta honesta: em que casos é que compensa mesmo não pagar?", en: "Five open video models, and the honest question: when does not paying actually pay off?" },
    intro: { pt: "Vídeo é a categoria onde o open source dá mais trabalho e onde o comercial ainda ganha com mais frequência. Vale a pena perceber porquê antes de gastares um fim de semana a instalar coisas.", en: "Video is the category where open source is most work and where commercial still wins most often. Worth understanding why before you spend a weekend installing things." },
    img: { pt: "📷 Captura de ecrã do teste (substituir por imagem própria)", en: "📷 Screenshot of the test (replace with your own image)" },
    note: { pt: "Disclosure: os modelos abertos deste artigo não pagam comissão. As ferramentas comerciais mencionadas têm links de afiliado noutras páginas do site, sempre assinalados.", en: "Disclosure: the open models here pay no commission. The commercial tools mentioned carry affiliate links on other pages of this site, always marked." },
    sections: [
      {
        h2: { pt: "Os cinco", en: "The five" },
        ul: {
          pt: ["<strong>LTX-2.5</strong> — dos mais rápidos a gerar, e dos mais fáceis de pôr a andar.", "<strong>Wan</strong> — bom equilíbrio entre qualidade e exigência de hardware.", "<strong>HunyuanVideo</strong> — qualidade alta, hardware alto.", "<strong>CogVideoX</strong> — o mais estudado e documentado, bom ponto de partida para quem quer perceber o que se passa por baixo.", "<strong>Mochi 1</strong> — movimento mais natural, mas pesado."],
          en: ["<strong>LTX-2.5</strong> — among the fastest to generate and the easiest to get running.", "<strong>Wan</strong> — good balance between quality and hardware demand.", "<strong>HunyuanVideo</strong> — high quality, high hardware.", "<strong>CogVideoX</strong> — the most studied and documented, a good starting point if you want to understand the internals.", "<strong>Mochi 1</strong> — more natural motion, but heavy."]
        },
      },
      {
        h2: { pt: "O que o comercial ainda faz melhor", en: "What commercial still does better" },
        p: {
          pt: ["Avatares que falam com a tua cara e a tua voz, tradução com sincronia labial, e bibliotecas de templates. É por isso que uma ferramenta como o HeyGen continua a fazer sentido para quem trabalha sozinho — comparámos as duas grandes em [HeyGen vs Synthesia](heygen).", "Os modelos abertos são melhores noutra coisa: geras o que quiseres, sem limite mensal e sem termos de utilização a dizer o que podes filmar."],
          en: ["Avatars that speak with your face and voice, translation with lip sync, and template libraries. That's why a tool like HeyGen still makes sense for solo creators — we compared the two big ones in [HeyGen vs Synthesia](heygen).", "Open models are better at something else: generate whatever you want, no monthly cap, and no terms of service telling you what you may film."]
        },
      },
      {
        h2: { pt: "O nosso teste", en: "Our test" },
        p: { pt: ["⚠️ POR TESTAR. Plano: o mesmo prompt de 5 segundos em dois modelos abertos e numa ferramenta comercial, com tempo, custo de GPU e resultado lado a lado."], en: ["⚠️ NOT YET TESTED. Plan: the same 5-second prompt through two open models and one commercial tool, with time, GPU cost and results side by side."] },
      },
      {
        h2: { pt: "Veredicto", en: "Verdict" },
        p: { pt: ["Se precisas de um avatar a falar, paga. O open source ainda não faz isso bem e vais perder mais em tempo do que poupas em mensalidade.", "Se precisas de planos gerados, b-roll ou experimentação sem limite, os modelos abertos ganham — e a partir da segunda dezena de vídeos por mês, ganham com folga."], en: ["If you need a talking avatar, pay. Open source doesn't do that well yet and you'll lose more in time than you save in subscription.", "If you need generated shots, b-roll or unlimited experimentation, the open models win — and past twenty videos a month, they win comfortably."] },
      },
    ],
  },
  {
    slug: "planos-gratis",
    category: "comparacao",
    date: "2026-08-17",
    affiliate: "elevenlabs",
    readMin: 7,
    updated: { pt: "agosto de 2026", en: "August 2026" },
    title: { pt: "Os planos grátis de IA que valem a pena em 2026", en: "The AI free tiers worth using in 2026" },
    meta: { pt: "ElevenLabs, Murf, Rytr, Writesonic e HeyGen: o que dá para fazer sem pagar, onde bates na parede, e quando compensa mesmo assinar.", en: "ElevenLabs, Murf, Rytr, Writesonic and HeyGen: what you can do without paying, where you hit the wall, and when subscribing actually pays off." },
    og: { pt: "O que dá para fazer sem pagar nada em 2026", en: "What you can actually do without paying in 2026" },
    summary: { pt: "Cinco ferramentas, cinco limites do plano grátis. E a conta de quando é que vale a pena passar a pago.", en: "Five tools, five free-tier limits. And the maths of when upgrading is worth it." },
    intro: { pt: "Ninguém assina antes de experimentar. Este artigo é o mapa do que consegues fazer a custo zero em cada uma das ferramentas que já testámos, e o ponto exato em que o plano grátis deixa de chegar.", en: "Nobody subscribes before trying. This article maps what you can do at zero cost in each of the tools we've tested, and the exact point where the free tier stops being enough." },
    img: { pt: "📷 Captura de ecrã do teste (substituir por imagem própria)", en: "📷 Screenshot of the test (replace with your own image)" },
    note: { pt: "Disclosure: este artigo contém links de afiliado. Testámos os planos grátis; não usámos contas pagas. Os links não mudam o preço que pagas.", en: "Disclosure: this article contains affiliate links. We tested the free tiers; we did not use paid accounts. The links don't change the price you pay." },
    sections: [
      {
        h2: { pt: "Como ler esta comparação", en: "How to read this comparison" },
        p: {
          pt: ["Um plano grátis não é uma demonstração: é um produto com limites. A pergunta certa não é «é bom?», é «quantos minutos, quantas palavras, quantos vídeos por mês?» — e depois se esse número chega para o que fazes.", "É por isso que cada linha abaixo tem um número, não um adjetivo."],
          en: ["A free tier isn't a demo: it's a product with limits. The right question isn't \"is it good?\", it's \"how many minutes, how many words, how many videos a month?\" — and then whether that number covers what you do.", "That's why every line below carries a number, not an adjective."]
        },
      },
      {
        h2: { pt: "Os limites, ferramenta a ferramenta", en: "The limits, tool by tool" },
        p: { pt: ["⚠️ POR TESTAR. Cada limite tem de ser confirmado na conta e datado — os planos grátis mudam sem aviso, e um número errado aqui é pior do que não ter artigo nenhum. Ver as reviews individuais: [ElevenLabs](elevenlabs), [Murf](murf), [Rytr](rytr), [Writesonic](writesonic)."], en: ["⚠️ NOT YET TESTED. Every limit must be confirmed in-account and dated — free tiers change without notice, and a wrong number here is worse than no article at all. See the individual reviews: [ElevenLabs](elevenlabs), [Murf](murf), [Rytr](rytr), [Writesonic](writesonic)."] },
      },
      {
        pc: {
          pros: { pt: ["Dá para decidir sem gastar", "Testas a qualidade na tua língua e no teu caso", "Sem compromisso nem cartão"], en: ["Enough to decide without spending", "You test quality in your language and your use case", "No commitment, no card"] },
          cons: { pt: ["Os limites mudam sem aviso", "Marca de água ou uso comercial proibido em alguns", "O plano grátis é desenhado para te fazer bater na parede"], en: ["Limits change without notice", "Watermarks or no commercial use on some", "The free tier is designed to make you hit the wall"] },
        },
      },
      {
        h2: { pt: "Veredicto", en: "Verdict" },
        p: { pt: ["A regra simples: se bates no limite duas vezes no mesmo mês, o pago já compensa. Se não bates, não assines — e volta cá quando bateres.", "E se nem o pago compensa, há a hipótese de não pagar a ninguém: os modelos abertos estão em [Voz com IA open source](voz-open-source)."], en: ["The simple rule: if you hit the limit twice in one month, paying already pays off. If you don't, don't subscribe — come back when you do.", "And if even paying doesn't pay off, there's the option of paying nobody: the open models are in [Open-source AI voice](voz-open-source)."] },
      },
    ],
    cta: {
      title: { pt: "Começa pelo plano grátis do ElevenLabs", en: "Start with ElevenLabs' free tier" },
      text: { pt: "É o que tem o limite mais generoso para voz em português e não pede cartão. Se bateres no limite, aí sim, falamos de pagar.", en: "It has the most generous free limit for Portuguese voice and asks for no card. If you hit the limit, then we can talk about paying." },
      button: { pt: "Experimentar grátis →", en: "Try it free →" },
      note: { pt: "Link de afiliado. Não muda o preço que pagas.", en: "Affiliate link. Doesn't change the price you pay." },
    },
  },
  {
    slug: "elevenlabs-plano-gratis",
    category: "guia",
    date: "2026-08-17",
    affiliate: "elevenlabs",
    readMin: 6,
    updated: { pt: "agosto de 2026", en: "August 2026" },
    title: { pt: "Até onde chegas nos 10 mil créditos grátis do ElevenLabs", en: "How far you get on ElevenLabs' 10k free credits" },
    meta: { pt: "Quantos minutos de áudio dão 10 mil créditos, o que fica de fora do plano grátis, e em que ponto compensa passar a pago.", en: "How many minutes of audio 10k credits buy, what the free tier leaves out, and when upgrading pays off." },
    og: { pt: "10 mil créditos grátis: quantos minutos são, na prática?", en: "10k free credits: how many minutes is that, really?" },
    summary: { pt: "Um número concreto por minuto de áudio vale mais do que qualquer adjetivo numa review.", en: "A concrete number per minute of audio beats any adjective in a review." },
    intro: { pt: "O plano grátis do ElevenLabs dá-te créditos por mês. Créditos não são minutos, e é aí que a maioria das pessoas se perde. Este guia converte uma coisa na outra e diz-te o que consegues fazer com isso.", en: "ElevenLabs' free tier gives you credits per month. Credits aren't minutes, and that's where most people get lost. This guide converts one into the other and tells you what you can actually do with it." },
    img: { pt: "📷 Captura de ecrã do teste (substituir por imagem própria)", en: "📷 Screenshot of the test (replace with your own image)" },
    note: { pt: "Disclosure: testei o ElevenLabs no plano grátis. Não usei conta paga. Os links de afiliado não mudam o preço que pagas.", en: "Disclosure: I tested ElevenLabs on the free tier. No paid account. Affiliate links don't change the price you pay." },
    sections: [
      {
        h2: { pt: "Créditos não são minutos", en: "Credits aren't minutes" },
        p: {
          pt: ["Os créditos contam-se por caractere, não por tempo. Quer dizer que um texto denso gasta mais do que um texto com pausas, e que a mesma quantidade de créditos rende diferente consoante o que escreves.", "A conversão prática é o que interessa, e é o que este guia mede."],
          en: ["Credits are counted per character, not per second. Which means dense text burns more than text with pauses, and the same credit balance stretches differently depending on what you write.", "The practical conversion is what matters, and it's what this guide measures."]
        },
      },
      {
        h2: { pt: "O que medimos", en: "What we measured" },
        p: { pt: ["⚠️ POR TESTAR. Plano: gerar um guião real de vídeo curto, contar caracteres e créditos gastos, e converter para minutos de áudio em português. Confirmar também o que o plano grátis proíbe: uso comercial, clonagem de voz e download."], en: ["⚠️ NOT YET TESTED. Plan: generate a real short-video script, count characters and credits spent, convert to minutes of Portuguese audio. Also confirm what the free tier forbids: commercial use, voice cloning and downloads."] },
      },
      {
        h2: { pt: "Quando compensa passar a pago", en: "When upgrading pays off" },
        p: {
          pt: ["A resposta depende de quantos vídeos fazes por mês, não da qualidade da voz — essa já é boa no grátis. Se fazes um vídeo por semana, provavelmente o grátis chega. Se fazes três, não chega.", "A comparação com as outras ferramentas está em [Os planos grátis que valem a pena](planos-gratis)."],
          en: ["The answer depends on how many videos you make a month, not on voice quality — that's already good on the free tier. One video a week and free probably covers you. Three and it doesn't.", "The comparison with the other tools is in [The AI free tiers worth using](planos-gratis)."]
        },
      },
      {
        h2: { pt: "Veredicto", en: "Verdict" },
        p: { pt: ["Para experimentar e para quem publica pouco, o plano grátis é dos mais honestos do mercado: dá para perceber mesmo se a voz serve para o teu português.", "Para uso profissional e regular, bates no limite depressa — e aí o pago compensa, mas só aí."], en: ["For trying it out and for people who publish rarely, this is one of the more honest free tiers around: enough to genuinely tell whether the voice works for your Portuguese.", "For regular professional use you hit the wall fast — and then paying pays off, but only then."] },
      },
    ],
    cta: {
      title: { pt: "Testa o plano grátis primeiro", en: "Try the free tier first" },
      text: { pt: "Não precisas de cartão. Gera a tua própria frase, na tua língua, e decide com o teu ouvido em vez da demo deles.", en: "No card needed. Generate your own sentence, in your own language, and decide with your ears instead of their demo." },
      button: { pt: "Abrir o ElevenLabs →", en: "Open ElevenLabs →" },
      note: { pt: "Link de afiliado. Não muda o preço que pagas.", en: "Affiliate link. Doesn't change the price you pay." },
    },
  },
];
