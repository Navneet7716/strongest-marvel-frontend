import { Text } from '@mantine/core'
import React from 'react'
import styles from "./Footer.module.css"


function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.footerText}>
                {/* add social links */}
                <Text variant="gradient">
                    Made By Navneet
                </Text>
                <Text variant="gradient">
                    <a href="https://github.com/Navneet7716">Github ❤️</a>
                </Text>

            </div>
        </div>
    )
}

export default Footer