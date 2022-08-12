
import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

import axios from 'axios';
import getRandomNumber from '../utils/getRandomNumber';
import { Alert, Badge, Button, Card, Center, Container, Group, Skeleton, Space, Text } from '@mantine/core';
import React from 'react';
import { useMediaQuery } from '@mantine/hooks';
import Head from 'next/head';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IconAlertCircle } from '@tabler/icons';

const Home: NextPage = () => {

  let { isLoading, error, data } = useQuery<any>(["get-character"], async () => {
    let first = getRandomNumber();
    let second = getRandomNumber();

    while (first === second) {
      second = getRandomNumber();
      first = getRandomNumber();
    }

    let char1 = await axios.get(`${process.env.NEXT_PUBLIC_API}${first}`);
    let char2 = await axios.get(`${process.env.NEXT_PUBLIC_API}${second}`);

    return {
      char1: char1.data.data,
      char2: char2.data.data
    }
  })

  const queryClient = useQueryClient()


  const matches = useMediaQuery('(max-width: 700px)');

  const vote = async (variable: any) => {
    await axios.post(process.env.NEXT_PUBLIC_VOTE_API!, { votedForId: variable.voteFor, votedAgainstId: variable.voteAgainst });
  }

  const mutation = useMutation(vote, {
    onMutate: (variable: any) => {
      queryClient.invalidateQueries(["get-character"]);
    },
    onError: (error: any) => {
      console.log(error);
    },
    cacheTime: 0
  })

  if (error) {
    return <Alert icon={<IconAlertCircle size={16} />} title="Bummer!" color="red">
      Some error occurred please try to reload the page!
    </Alert>
  }


  if (isLoading || mutation.isLoading) {
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

                    <Skeleton visible={isLoading || mutation.isLoading} animate={true} height={350} width={350}>
                    </Skeleton>
                  </Center>
                </Card.Section>

                <Group position="center" mt="md" mb="xs">
                  <Skeleton visible={isLoading || mutation.isLoading} animate={true} height={30} width={350}>
                  </Skeleton>
                </Group>
                <Center>

                  <Skeleton visible={isLoading || mutation.isLoading} animate={true} height={30} width={200}>
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
                    <Skeleton visible={isLoading || mutation.isLoading} animate={true} height={350} width={350}>

                    </Skeleton>
                  </Center>
                </Card.Section>

                <Group position="center" mt="md" mb="xs">
                  <Skeleton visible={isLoading || mutation.isLoading} animate={true} height={30} width={350}>
                  </Skeleton>
                </Group>
                <Center>
                  <Skeleton visible={isLoading || mutation.isLoading} animate={true} height={30} width={200}>
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
        <meta name="description" content={`Who is more stronger marvel amongst ${data.char1.name} and ${data.char2.name}?`} />
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
                <Image src={data!.char1.image} alt="hero image" width={350} height={350} className={styles.image} />
              </Card.Section>

              <Group position="center" mt="md" mb="xs">
                <Text weight={500}>{data!.char1.name}</Text>
              </Group>

              <Button onClick={() => mutation.mutate({ voteFor: data!.char1.id, voteAgainst: data!.char2.id })} variant="light" color="green" fullWidth mt="md" radius="md">
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
                <Image src={data.char2.image} alt="hero image" width={350} height={350} className={styles.image} />
              </Card.Section>

              <Group position="center" mt="md" mb="xs">
                <Text weight={500}>{data.char2.name}</Text>
              </Group>

              <Button onClick={() => mutation.mutate({ voteFor: data!.char2.id, voteAgainst: data!.char1.id })} variant="light" color="green" fullWidth mt="md" radius="md">
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

export default Home
