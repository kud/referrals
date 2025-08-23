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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
    background-color: #000;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #a1a1aa;
    line-height: 1.6;
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }

  ::selection {
    background-color: #27272a;
    color: #fff;
  }
`

const Root = styled.div`
  min-height: 100vh;
  padding: 0 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`

const Hero = styled.div`
  margin: 3rem 0 2rem 0;
  padding: 0;
  background: transparent;
  
  @media (min-width: 768px) {
    margin: 4rem 0 3rem 0;
  }
`

const HeaderSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 4rem 0;
  padding: 0;
  background: transparent;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`

const HeaderTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 600;
  color: #fff;
  margin: 0 0 1.5rem 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
`

const HeaderText = styled.p`
  color: #71717a;
  font-size: 1.125rem;
  margin: 0 0 1rem 0;
  line-height: 1.6;
  text-align: center;
  max-width: 560px;
`

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
  
  @media (min-width: 768px) {
    gap: 2rem;
  }
`

const Item = styled.a`
  display: block;
  background: #111111;
  border: 1px solid #27272a;
  border-radius: 8px;
  padding: 0;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3f3f46;
    background: #161616;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`

Item.Code = styled.span`
  display: block;
  padding: 1.5rem;
  background: #0a0a0a;
  color: #71717a;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.01em;
  border-bottom: 1px solid #27272a;
  min-height: 60px;
  display: flex;
  align-items: center;
`

Item.Heading = styled.span`
  display: block;
  padding: 1.5rem;
  background: transparent;
  color: #fff;
  font-size: 1.125rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.4;
`

const SpinnerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  border-radius: 8px;
`

const Spinner = styled.div`
  border: 2px solid #27272a;
  border-top: 2px solid #71717a;
  border-radius: 50%;
  width: 24px;
  height: 24px;
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
        <Hero />

        <HeaderSection>
          <HeaderTitle>referrals</HeaderTitle>
          <HeaderText>
            Exclusive codes and referral links for various platforms and services.
          </HeaderText>
          <HeaderText>
            Click any card to copy the code and open the referral link.
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
                      fontWeight: 400,
                      color: "#a1a1aa",
                      fontSize: "0.875rem",
                      fontFamily: "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
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
