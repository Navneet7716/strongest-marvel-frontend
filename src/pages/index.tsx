
import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

import axios from 'axios';
import getRandomNumber from '../utils/getRandomNumber';
import { Badge, Button, Card, Center, Container, Group, Skeleton, Space, Text } from '@mantine/core';
import React from 'react';
import { useMediaQuery } from '@mantine/hooks';
import Head from 'next/head';

const Home: NextPage = (props: any) => {

  const matches = useMediaQuery('(max-width: 700px)');

  const [char1, setChar1] = React.useState(props.char1);
  const [char2, setChar2] = React.useState(props.char2);

  const [loading, setLoading] = React.useState(false);


  const vote = async (id: number) => {

    setLoading(true);
    if (id === props.char1.id) {
      await axios.post(process.env.NEXT_PUBLIC_VOTE_API!, { votedForId: props.char1.id, votedAgainstId: props.char2.id })
    }
    else {
      await axios.post(process.env.NEXT_PUBLIC_VOTE_API!, { votedForId: props.char2.id, votedAgainstId: props.char1.id })
    }

    let first = getRandomNumber();
    let second = getRandomNumber();


    while (first === props.char1.id || first === props.char2.id) {
      first = getRandomNumber();
    }
    while (second === props.char1.id || second === props.char2.id) {
      second = getRandomNumber();
    }


    let newChar1 = await axios.get(`${process.env.NEXT_PUBLIC_API}${first}`);
    let newChar2 = await axios.get(`${process.env.NEXT_PUBLIC_API}${second}`);

    setChar1(newChar1.data.data);
    setChar2(newChar2.data.data);
    setLoading(false);

  }


  if (loading) {
    // return loading transition element
    return (
      <>

        <Container>

          <h1 className={styles.title}>
            Who is the strongest?
          </h1>

          <div className={!matches ? styles.mainDiv : styles.mobMainDiv}>
            <div>
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Card.Section>
                  <Center >

                    <Skeleton visible={loading} animate={true} height={350} width={350}>
                    </Skeleton>
                  </Center>
                </Card.Section>

                <Group position="center" mt="md" mb="xs">
                  <Skeleton visible={loading} animate={true} height={30} width={350}>
                  </Skeleton>
                </Group>
                <Center>

                  <Skeleton visible={loading} animate={true} height={30} width={200}>
                  </Skeleton>
                </Center>
              </Card>

            </div>
            <div>
              <h1 className={styles.title}>vs</h1>
            </div>
            <div>
              <Card shadow="sm" p="lg" radius="md" withBorder style={{}}>
                <Card.Section>
                  <Center >
                    <Skeleton visible={loading} animate={true} height={350} width={350}>

                    </Skeleton>
                  </Center>
                </Card.Section>

                <Group position="center" mt="md" mb="xs">
                  <Skeleton visible={loading} animate={true} height={30} width={350}>
                  </Skeleton>
                </Group>
                <Center>
                  <Skeleton visible={loading} animate={true} height={30} width={200}>
                  </Skeleton>
                </Center>
              </Card>
            </div>
          </div>


        </Container>
        <Space h="lg" />


      </>
    )

  }


  return (
    <>

      <Head>

        <title>Who is the strongest?</title>
        <meta charSet="UTF-8" />
        <meta name="description" content={`Who is more stronger marvel amongst ${char1.name} and ${char2.name}?`} />
        <meta name="keywords" content="Marvel, strong, compare" />
        <meta name="author" content="Navneet Singh" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

      </Head>

      <Container>

        <h1 className={styles.title}>
          Who is the strongest?
        </h1>

        <div className={!matches ? styles.mainDiv : styles.mobMainDiv}>
          <div>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section>
                <Image src={char1.image} alt="hero image" width={350} height={350} className={styles.image} />
              </Card.Section>

              <Group position="center" mt="md" mb="xs">
                <Text weight={500}>{char1.name}</Text>
              </Group>

              <Button onClick={() => vote(char1.id)} variant="light" color="green" fullWidth mt="md" radius="md">
                Stronger
              </Button>
            </Card>
          </div>
          <div>
            <h1 className={styles.title}>vs</h1>
          </div>
          <div>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section>
                <Image src={char2.image} alt="hero image" width={350} height={350} className={styles.image} />
              </Card.Section>

              <Group position="center" mt="md" mb="xs">
                <Text weight={500}>{char2.name}</Text>
              </Group>

              <Button onClick={() => vote(char2.id)} variant="light" color="green" fullWidth mt="md" radius="md">
                Stronger
              </Button>
            </Card>
          </div>
        </div>


      </Container>
      <Space h="lg" />
      <Space h="lg" />
      <Space h="lg" />
      <Space h="lg" />
    </>
  )
}

export async function getServerSideProps() {

  let first = getRandomNumber();
  let second = getRandomNumber();

  while (first === second) {
    second = getRandomNumber();
    first = getRandomNumber();
  }

  let char1 = await axios.get(`${process.env.API}${first}`);
  let char2 = await axios.get(`${process.env.API}${second}`);

  // console.log(char1.data.data);
  // console.log(char2.data.data);

  return {
    props: {
      char1: char1.data.data,
      char2: char2.data.data
    },
  }
}

export default Home
