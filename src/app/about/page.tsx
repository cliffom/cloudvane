import styles from "./about.module.css";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link'
import header from '../../../public/images/circuit.webp'


export default function About() {
    return (
        <main className={styles.main}>
            <div className={styles.post}>
                <h1>A Spark of Curiosity: Journey into Circuits</h1>
                <hr />
                <h3 className={styles.description}>A fun project featuring Arduino, Raspberry Pi, Python, and React+Next.js</h3>
                <div className={styles.profile}>
                    <div className={styles.profileName}>Michael Clifford</div>
                    <div className={styles.date}>Feb 6, 2024</div>
                </div>
                <hr />
                <div className={styles.headerImage}>
                    <Image
                        src={header}
                        width={800}
                        height={600}
                        alt="Picture of the circuit in its final form"

                    />
                </div>
                <p>This story begins with a spark of inspiration and unfolds into a project, all inspired by the innocent wonder of a child.</p>

                <h2 className={styles.subtitle}>What is this?</h2>
                <p><Link href="/">CloudVane</Link> is the sum of parts made up of <Link href="https://www.arduino.cc/">Arduino</Link>, <Link href="https://www.raspberrypi.com/">Raspberry Pi</Link>, Python, and React/Next.js.</p>

                <h2 className={styles.subtitle}>But why?</h2>
                <p>About a week ago, my daughter, a 3rd grader and cat lover, came home from school excited to share that she had learned about how switches and lightbulbs work. Essentially, she was introduced to the basic concept of circuits, and she was eager to tell me more and learn more herself.</p>
                <p>I was ecstatic. Having been introduced to computers at the age of 5 (in 1985!), I've always had a passion for technology. My journey into software development paralleled my adventures in building my own circuits and becoming familiar with Ohm's Law (ah, P=IE). This presented a wonderful opportunity to share something I love with her and to foster her interest.</p>
                <p>Unfortunately, my hardware days are long behind me, and I had given away most of my equipment to classmates and friends who continued to pursue it as a hobby. However, armed with my trusty multimeter, I discovered that getting back into it felt like relearning to ride a bike: you never really forget, and wow, there are some impressive bikes these days.</p>
                <p>Arduino is incredible. These self-contained microcontroller development boards replace the custom ISA cards we used to build. The Arduino language makes it unnecessary to switch to ASM from C.</p>
                <p>The Raspberry Pi offers an entire platform for writing code, hosting a web service, and gathering data from other connected devices. It's such a capable computer in a tiny package. While I own more than one, I've primarily used them as tiny retro emulators to pass time at lunch with coworkers (and to satisfy my Dr. Mario craving).</p>
                <p>While none of these technologies are new, this was my first opportunity to play with some modern toys (and perhaps show my kids how cool their old man is).</p>

                <h2 className={styles.subtitle}>How does it work?</h2>
                <p>In summary, a <Link href="https://www.adafruit.com/product/386">DHT11</Link> sensor measures temperature and humidity data. This sensor data is then captured by an Arduino and transmitted to a Raspberry Pi via a serial connection. The corresponding Arduino sketch is available on GitHub.</p>
                <p>On the Raspberry Pi, a Python script reads the data from the serial connection and forwards it as JSON through HTTP requests. This server is made accessible to the internet via <Link href="https://ngrok.com/">ngrok</Link>.</p>
                <p>However, nobody enjoys reading raw JSON (as my wife put it: "Make it prettier!"), so a React/Next.js client retrieves the data from the Python service and presents it in a more user-friendly format, suitable for human interpretation.</p>
                <p>Together, this setup is an example of what is collectively known as the <Link href="https://www.internetsociety.org/iot/">Internet of Things (IoT)</Link>.</p>

                <h2 className={styles.subtitle}>Project Schematic</h2>
                <p>Coming soon!</p>

                <h2 className={styles.subtitle}>Project Links</h2>
                <p>Arduino Sketch: <Link href="https://github.com/cliffom/arduino-weather-clock">arduino-weather-clock</Link></p>
                <p>Python Server: <Link href="https://github.com/cliffom/cloudvane-api">cloudvane-api</Link></p>
                <p>React UI: <Link href="https://github.com/cliffom/cloudvane">cloudvane</Link></p>

            </div >
        </main >
    );
}
