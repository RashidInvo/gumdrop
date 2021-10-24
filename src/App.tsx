import React, { useEffect, useState } from "react";
import {
  HashRouter,
  Link,
  Route,
  Switch,
} from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
  Button,
  Link as HyperLink,
  Stack,
} from "@mui/material";

import "./App.css";
import {
  useColorMode,
} from "./contexts";
import Header from "./components/Header/Header";
import { Claim } from "./components/Claim";
import { Create } from "./components/Create";

const WHITESPACE = "\u00A0";

type AboutProps = {};

const About = (
  props : AboutProps,
) => {
  return (
    <Stack spacing={3}>
    <Stack
      alignContent="left"
      textAlign="left"
      spacing={1}
    >
      <div>
      Merkle Airdrop leverages the Solana blackhain and merkle trees to
      facilitate airdrops by removing the prohibitive costs to the creators.
      </div>


      <div>
      In the Solana ecosystem, the cost to creators for airdropped tokens is
      currently largely due to rent costs being{WHITESPACE}
      <HyperLink
        href="https://docs.solana.com/implemented-proposals/rent"
        underline="none"
      >
        "fixed at the genesis"
      </HyperLink>
      {WHITESPACE}(although there is a{WHITESPACE}
      <HyperLink
        href="https://forums.solana.com/t/proposal-for-a-temporary-one-off-code-change-to-reduce-the-skyrocketing-costs-of-rent/1572"
        underline="none"
      >
        proposal
      </HyperLink>
      {WHITESPACE}to temporarily reduce these costs until a dynamic solution is
      built). With the large increase in SOLUSD since genesis, rent costs have
      duly skyrocketed.
      </div>


      <div>
      The merkle distributor, pioneered by{WHITESPACE}
      <HyperLink
        href="https://github.com/Uniswap/merkle-distributor"
        underline="none"
      >
        Uniswap
      </HyperLink>
      {WHITESPACE}and ported to Solana by{WHITESPACE}
      <HyperLink
        href="https://github.com/saber-hq/merkle-distributor"
        underline="none"
      >
        Saber
      </HyperLink>, solves this issue by building a 256-bit "root hash" from a
      list of recipients and balances. This moves the rent costs and (nominal)
      transaction fee to the claimer if they so choose to redeem the airdrop.
      </div>

      <div>
      This website exposes a web-friendly way to access the on-chain
      distributor. Creation is done by choosing a Mint, an off-chain
      notification method, and supplying a list of recipients and balances with
      the following JSON schema.
      <pre>{`
[
  {
    "handle": "<DISTRIBUTION-SPECIFIC-HANDLE>"
    "amount": <#-TOKENS>
  },
  ...
]
      `}</pre>
      Claims are redeemed through a URL with query params holding
      claim-specific keys. These should be kept secret! Anyone can redeem a
      claim once they have the URL.
      </div>
    </Stack>
    <Stack
      direction="row"
      spacing={2}
    >
      <Link to="/create">
        <Button
          style={{width: "30ch"}}
          variant="contained"
          color="info"
        >
          Create
        </Button>
      </Link>
      <Link to="/claim">
        <Button
          style={{width: "30ch"}}
          variant="contained"
          color="info"
        >
          claim
        </Button>
      </Link>
    </Stack>
    </Stack>
  );
};

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

function App() {
  const colorModeCtx = useColorMode();

  useEffect(() => {}, [colorModeCtx.mode]);

  const { height } = useWindowDimensions();

  const theme = React.useMemo(
    () => {
      const mode =
        colorModeCtx.mode === "dark" || !colorModeCtx.mode ? "dark" : "light";

      return createTheme({
        palette: {
          mode,
        },
      })
    },
    [colorModeCtx.mode]
  );

  return (
    <div className="App" style={{ backgroundColor: "transparent" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Box
          sx={{
            width: 600,
            height: "100%",
            flexGrow: 1,
            pt: `${Math.floor(0.2 * height)}px`,
            px: "50%",
            display: "flex",
            alignSelf: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <HashRouter>
            <Switch>
              <Route path="/create" component={Create} />
              <Route path="/claim" component={Claim} />
              <Route path="/" component={About} />
            </Switch>
          </HashRouter>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
