import { Alert, Badge, Button, Card, Group, Paper, Space, Text } from "@mantine/core";
import { IconAlertCircle, IconLayoutList, IconLayoutGrid } from "@tabler/icons";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { motion, Variants } from 'framer-motion';

import styles from "../../styles/Home.module.css";
import { useState } from "react";



const generateCountPercent = (character: any) => {
    const { VoteFor, VoteAgainst } = character._count;
    if (VoteFor + VoteAgainst === 0) {
        return 0;
    }
    return (VoteFor / (VoteFor + VoteAgainst)) * 100;
};

const cardVariants: Variants = {
    offscreen: {
        y: 300
    },
    onscreen: {
        y: 50,
        rotate: 0,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    }
};

const listVariants: Variants = {
    offscreen: {
        y: 300
    },
    onscreen: {
        y: 50,
        rotate: 0,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    }
};

export default function ResultPage(props: any) {



    const [view, setView] = useState("card");

    const handleViewChange = (view: string) => {
        setView(view);
    }

    return (
        <>

            <Head>

                <title>Results</title>
                <meta charSet="UTF-8" />
                <meta name="description" content={`Results of the voting`} />
                <meta name="keywords" content="Marvel, strong, compare" />
                <meta name="author" content="Navneet Singh" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

            </Head>

            <div className={styles.resultsMain}>
                <Alert icon={<IconAlertCircle size={16} />} mt={10} title="Info!" radius="md" variant="light">
                    This page updates every 5 minutes.
                </Alert>

                <h1 className={styles.title}>Results</h1>

                <Button.Group>
                    <Button onClick={() => handleViewChange("list")} variant="default" leftIcon={<IconLayoutList size={18} />}>List View</Button>
                    <Button onClick={() => handleViewChange("card")} variant="default" leftIcon={<IconLayoutGrid size={18} />} >Card View</Button>
                </Button.Group>
                <div className={view === "list" ? styles.resultList : styles.resultListCard}>



                    {view === "list" ? (
                        <>

                            {props.character
                                .sort((a: any, b: any) => {
                                    const difference =
                                        generateCountPercent(b) - generateCountPercent(a);

                                    if (difference === 0) {
                                        return b._count.VoteFor - a._count.VoteFor;
                                    }

                                    return difference;
                                })
                                .map((character: any, index: number) => {

                                    return (
                                        <motion.div
                                            initial="offscreen"
                                            whileInView="onscreen"
                                            viewport={{ once: true, amount: 0.8 }}
                                            key={character.id}
                                        >
                                            <motion.div variants={listVariants}>
                                                <Paper shadow="xs" withBorder key={character.id}>

                                                    <Badge variant="light" color={index + 1 == 1 ? "yellow" : index + 1 == 2 ? "blue" : index + 1 == 3 ? "grape" : "dark"}>{index + 1}</Badge>
                                                    <div style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        gap: "1rem",
                                                        width: "60vw",
                                                        padding: "1rem"
                                                    }}>


                                                        <div style={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            gap: "1rem",
                                                        }}>
                                                            <Image src={character.image} height={100} width={100} />
                                                            <Text>{character.name}</Text>
                                                        </div>
                                                        <div style={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                        }}>
                                                            <Text> {generateCountPercent(character).toFixed(2) + "%"}</Text>
                                                        </div>
                                                    </div>
                                                </Paper>
                                            </motion.div>
                                        </motion.div>
                                    )
                                })}

                        </>) : (<>

                            {props.character
                                .sort((a: any, b: any) => {
                                    const difference =
                                        generateCountPercent(b) - generateCountPercent(a);

                                    if (difference === 0) {
                                        return b._count.VoteFor - a._count.VoteFor;
                                    }

                                    return difference;
                                })
                                .map((character: any, index: number) => {

                                    return (
                                        <motion.div
                                            initial="offscreen"
                                            whileInView="onscreen"
                                            viewport={{ once: true, amount: 0.8 }}
                                            key={character.id}
                                        >
                                            <motion.div className={styles.card} variants={cardVariants}>
                                                <Card radius="lg" style={{
                                                    height: "100%",
                                                }}>
                                                    <Card.Section>
                                                        <Image src={character.image} alt="hero image" width={350} height={350} className={styles.image} />
                                                    </Card.Section>

                                                    <Group position="apart" mt="md" mb="xs">
                                                        <Text weight={500}>{character.name}</Text>
                                                        <Badge variant="light" color={index + 1 == 1 ? "yellow" : index + 1 == 2 ? "blue" : index + 1 == 3 ? "grape" : "dark"}>{index + 1}</Badge>
                                                        <Badge variant="light" color={index + 1 == 1 ? "yellow" : index + 1 == 2 ? "blue" : index + 1 == 3 ? "grape" : "dark"}>{generateCountPercent(character).toFixed(2) + "%"}</Badge>
                                                    </Group>

                                                </Card>
                                            </motion.div>
                                        </motion.div>
                                    )
                                })}

                        </>)}

                </div>
                <Space h="xl" />
                <Space h="xl" />
                <Space h="xl" />
                <Space h="xl" />

            </div>
        </>
    );
}


export async function getStaticProps() {

    const characterOrdered = await axios.get(process.env.BASE_URL + "results");

    const DAY_IN_SECONDS = 60 * 5;
    return { props: { character: characterOrdered.data.data }, revalidate: DAY_IN_SECONDS };
}