import {
  Button,
  Paper,
} from "@mantine/core";
import { NextLink } from "@mantine/next";

import styles from "./Navbar.module.css";


export default function Navbar() {
  return (
    <Paper shadow="xs" withBorder className={styles.Navbar}>
      <div className={styles.NavbarRight}>
        <Button variant="subtle" component={NextLink} href="/">
          Home
        </Button>
        <Button variant="subtle" component={NextLink} href="/results">
          Results
        </Button>
      </div>
    </Paper>
  )
}