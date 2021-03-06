/* eslint-disable radix */
import React, { useState, useEffect } from 'react';
import { useSubspace } from '@embarklabs/subspace-react';
import {
  Grid, Button, LinearProgress,
} from '@material-ui/core';
import InfractionDetails from '../../components/InfractionDetails';
import NoMoreInfrctions from '../../components/NoMoreInfractions';

import { infractionFactoryAddress, infractionFactoryAbi } from '../../web3/infractionFactory';
import { infractionAbi } from '../../web3/infraction';

function Page() {
  const subspace = useSubspace();
  const [account, setAccount] = useState();
  const [index, setIndex] = useState(0);
  const [infractionFactory, setInfractionFactory] = useState();
  const [totalInfractions, setTotalInfractions] = useState();
  const [infractionAddress, setInfractionAddress] = useState();
  const [infraction, setInfraction] = useState();
  const [hasVoted, setHasVoted] = useState(true);
  useEffect(() => {
    if (account || !subspace) return;

    subspace.web3.eth.getAccounts()
      .then(([a]) => {
        setAccount(a);
      });
  }, [subspace, account]);
  useEffect(() => {
    if (infractionFactory) return;
    setInfractionFactory(subspace.contract(
      { abi: infractionFactoryAbi, address: infractionFactoryAddress },
    ));
  }, [subspace, infractionFactory]);

  useEffect(() => {
    if (!infractionFactory || !subspace) return;
    infractionFactory.methods.getTotalInfactinsForVote().call()
      .then((total) => {
        setTotalInfractions(parseInt(total));
      });
  }, [subspace, infractionFactory]);

  useEffect(() => {
    if (!totalInfractions || !infractionFactory || index >= totalInfractions) return;
    infractionFactory.methods.infractionsForVote(index).call()
      .then((address) => {
        setInfractionAddress(address);
        setInfraction(subspace.contract(
          { abi: infractionAbi, address },
        ));
      });
  }, [totalInfractions, infractionFactory, index, totalInfractions]);

  useEffect(() => {
    if (!infraction) return;
    infraction.methods.hasVoted(account).call()
      // eslint-disable-next-line consistent-return
      .then((voted) => {
        if (voted) return setIndex(index + 1);
        setHasVoted(voted);
      });
  }, [infraction]);

  async function handleTrue() {
    console.log(true);
    setIndex(index + 1);
    setHasVoted(true);
    setInfraction(undefined);
    setInfractionAddress(undefined);
  }

  async function handleFalse() {
    console.log(false);
    setIndex(index + 1);
    setHasVoted(true);
    setInfraction(undefined);
    setInfractionAddress(undefined);
  }
  console.log(index, totalInfractions);
  if (index === totalInfractions) return <NoMoreInfrctions />;
  return (
    <>
      { hasVoted
        ? <LinearProgress />
        : (
          <>
            <InfractionDetails address={infractionAddress} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button fullWidth variant="contained" onClick={handleFalse}>
                  Invalida
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="contained" color="secondary" onClick={handleTrue}>
                  Valida
                </Button>
              </Grid>

            </Grid>
          </>
        )}
    </>
  );
}

export default Page;
