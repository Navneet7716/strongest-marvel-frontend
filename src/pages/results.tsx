import { Alert, Paper, Space, Text } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import axios from "axios";
import Image from "next/image";

import styles from "../../styles/Home.module.css";


const generateCountPercent = (character: any) => {
    const { VoteFor, VoteAgainst } = character._count;
    if (VoteFor + VoteAgainst === 0) {
        return 0;
    }
    return (VoteFor / (VoteFor + VoteAgainst)) * 100;
};


export default function ResultPage(props: any) {

    return (
        <div className={styles.resultsMain}>
            <Alert icon={<IconAlertCircle size={16} />} mt={10} title="Info!" radius="md" variant="light">
               This page updates every 5 minutes.
            </Alert>

            <h1 className={styles.title}>Results</h1>

            <div className={styles.resultList}>

                {props.character
                    .sort((a: any, b: any) => {
                        const difference =
                            generateCountPercent(b) - generateCountPercent(a);

                        if (difference === 0) {
                            return b._count.VoteFor - a._count.VoteFor;
                        }

                        return difference;
                    })
                    .map((character: any) => {
                        return (<Paper shadow="xs" p="md" withBorder>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "1rem",
                                width: "60vw"
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
                        </Paper>)
                    })}

            </div>
            <Space h="xl" />
            <Space h="xl" />
            <Space h="xl" />
            <Space h="xl" />

        </div>
    );
}


export async function getStaticProps() {

    const characterOrdered = await axios.get(process.env.BASE_URL + "results");

    const DAY_IN_SECONDS = 60 * 5;
    return { props: { character: characterOrdered.data.data }, revalidate: DAY_IN_SECONDS };
}