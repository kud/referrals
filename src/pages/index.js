import React from "react"
import Head from "next/head"
import styled from "@emotion/styled"
import { Global, css } from "@emotion/react"
import { Client } from "@notionhq/client"
import toast, { Toaster } from "react-hot-toast"

const NOTION_API_KEY = process.env.NOTION_API_KEY
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID

const notion = new Client({ auth: NOTION_API_KEY })

const globalStyles = css`
  html,
  body {
    font-family: Helvetica, Arial, sans-serif;
    background-color: #f2f2f2;
    -moz-osx-font-smoothing: grayscale;
    color: #404040;
  }
`

const Root = styled.div`
  padding: 0 4rem;
  max-width: 1280px;
  margin: auto;
`

const Hero = styled.div`
  width: 100vw;
  max-width: 100vw;
  margin: 2rem 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 0;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  background: #fff;
  min-height: 220px;
  max-height: 300px;
  height: 300px;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`

Hero.Image = styled.img`
  width: 100%;
  height: 100%;
  max-height: 300px;
  object-fit: cover;
  display: block;
`

const HeaderSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2.5rem 0 2rem 0;
  padding: 2.5rem 2rem 2rem 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0;
  animation: fadeIn 0.8s ease 0.1s forwards;
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`

const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #23272f;
  margin-bottom: 1.2rem;
  letter-spacing: -0.5px;
`

const HeaderText = styled.p`
  color: #555;
  font-size: 1.15rem;
  margin: 0.5rem 0 0.5rem 0;
  line-height: 1.7;
  text-align: center;
`

const Main = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Item = styled.a`
  width: 100%;
  max-width: 320px;
  border-radius: 6px;
  background: linear-gradient(135deg, #fff 80%, #f0f4ff 100%);
  margin: 1.5rem 2rem;
  transition: box-shadow 300ms cubic-bezier(0.4, 2, 0.6, 1),
    transform 200ms cubic-bezier(0.4, 2, 0.6, 1);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.06), 0 6px 24px 0 rgba(0, 0, 0, 0.08);
  text-decoration: none;
  color: #222;
  border: 1.5px solid #e6e6e6;
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: 0 12px 32px rgba(80, 80, 80, 0.13),
      0 2px 8px rgba(0, 0, 0, 0.06);
    transform: translateY(-4px) scale(1.025);
    border-color: #bdbdbd;
    cursor: pointer;
    background: linear-gradient(135deg, #f7f7f7 80%, #eaeaea 100%);
  }
`

Item.Code = styled.span`
  color: #2d3a4a;
  background: #f6f8fa;
  border-radius: 4px 4px 0 0;
  padding: 1.5rem 2rem 1rem 2rem;
  display: block;
  font-family: "Fira Mono", "Monaco", "Consolas", monospace;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
  font-weight: 500;
  border-bottom: 1px solid #e6e6e6;
  min-height: 48px;
`

Item.Heading = styled.span`
  padding: 1.2rem 2rem 1.2rem 2rem;
  margin: 0;
  background: #fafdff;
  font-weight: 600;
  display: block;
  font-size: 1.35rem;
  color: #2d3a4a;
  border-radius: 0 0 4px 4px;
  letter-spacing: 0.01em;
`

const SpinnerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`

const Spinner = styled.div`
  border: 3px solid #e6e6e6;
  border-top: 3px solid #bdbdbd;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export const getStaticProps = async () => {
  const meta = {
    url: "https://referrals.kud.io/",
    title: "Get Referrals | _kud",
    description: "Get some vouchers for different platforms.",
    preview: "https://referrals.kud.io/preview.jpg",
    keywords:
      "referrals, discount, price, code, promo, voucher, vouchers, referral, price, groslot, reduction, prix, partnership, offer, savings, coupon, deal, special, discount code, promotional offer, cashback, loyalty, rewards, clearance, sale, limited time, exclusive, online shopping, e-commerce, savings, budget-friendly, affordable, bargain, markdown, price drop, special offer, promotional code, discount voucher",
  }

  const database = await notion.databases.query({
    database_id: NOTION_DATABASE_ID,
  })

  const rawPages = database.results

  const pagePromises = rawPages.map(async ({ id }) => {
    const page = await notion.pages.retrieve({ page_id: id })

    return {
      name:
        page.properties.name[page.properties.name.type][0]?.plain_text || null,
      code:
        page.properties.code[page.properties.code.type][0]?.plain_text || null,
      url: page.properties.url[page.properties.url.type][0]?.plain_text || null,
    }
  })

  const items = await Promise.all(pagePromises)

  return {
    props: {
      items,
      meta,
    },
    revalidate: 1,
  }
}

const IndexPage = ({ items, meta }) => {
  const [loadingIndex, setLoadingIndex] = React.useState(null)
  const [countdown, setCountdown] = React.useState(0)

  const handleClick = async ({ name, code, url }, event, idx) => {
    event.preventDefault()
    await navigator.clipboard.writeText(code)
    toast.success(`Code for ${name} copied to clipboard! 🎉`)
    setLoadingIndex(idx)
    setCountdown(3)
    let seconds = 3
    const interval = setInterval(() => {
      seconds -= 1
      setCountdown(seconds)
      if (seconds === 0) {
        clearInterval(interval)
      }
    }, 1000)
    setTimeout(() => {
      setLoadingIndex(null)
      window.open(url, "_blank")
    }, 3000)
  }

  return (
    <>
      <Global styles={globalStyles} />

      <Head>
        <meta charSet="utf-8" />
        <title>{meta.title}</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, user-scalable=no"
        />
        <meta name="description" content={meta.description} key="description" />
        <meta name="keywords" content={meta.keywords} />

        <meta property="og:type" content="website" key="ogType" />
        <meta property="og:url" content={meta.url} key="ogUrl" />
        <meta property="og:title" content={meta.title} key="ogTitle" />
        <meta
          property="og:description"
          content={meta.description}
          key="ogDescription"
        />
        <meta property="og:image" content={meta.preview} key="ogImage" />

        <meta
          name="twitter:card"
          content="summary_large_image"
          key="twitterCard"
        />
        <meta name="twitter:url" content={meta.url} key="twitterUrl" />
        <meta name="twitter:title" content={meta.title} key="twitterTitle" />
        <meta
          name="twitter:description"
          content={meta.description}
          key="twitterDescription"
        />
        <meta name="twitter:image" content={meta.preview} key="twitterImage" />
      </Head>

      <Root>
        <Hero>
          <Hero.Image src="/hero.jpg" alt="Referrals Hero" />
        </Hero>

        <HeaderSection>
          <HeaderTitle>Get referrals</HeaderTitle>
          <HeaderText>
            Hello and welcome to my referral page. Each box represents a
            referral.
          </HeaderText>
          <HeaderText>
            Just note that when you click on one, it'll open a new tab and –
            depending on the referral – will also copy the code in the
            clipboard. Enjoy! 🙌
          </HeaderText>
        </HeaderSection>

        <Main>
          {items.map(({ name, code, url }, idx) => (
            <Item
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleClick({ name, code, url }, e, idx)}
            >
              {loadingIndex === idx && (
                <SpinnerOverlay>
                  <Spinner />
                  <span
                    style={{
                      marginLeft: 12,
                      fontWeight: 500,
                      color: "#888",
                      fontSize: "1.1rem",
                    }}
                  >
                    Opening in {countdown}s…
                  </span>
                </SpinnerOverlay>
              )}
              <Item.Code>{code ? code : "Direct link 🔗"}</Item.Code>
              <Item.Heading>{name}</Item.Heading>
            </Item>
          ))}
        </Main>

        <Toaster />
      </Root>
    </>
  )
}

export default IndexPage
