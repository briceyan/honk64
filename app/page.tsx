"use client";

import { useState } from "react";
import { encode, decode } from "../utils/honk64";
import { Container, Textarea, Button, Text, Title, Stack, Group, Image } from "@mantine/core";
import { CopyButton, ActionIcon, Tooltip, rem } from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";

const CopyIconButton = ({ value }: { value: string }) => {
  return (
    <CopyButton value={value} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
          <ActionIcon color={copied ? "teal" : "gray"} variant="subtle" onClick={copy}>
            {copied ? <IconCheck style={{ width: rem(16) }} /> : <IconCopy style={{ width: rem(16) }} />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
};

const Home = () => {
  // States for the translation operations
  const [englishInput, setEnglishInput] = useState("");
  const [honkOutput, setHonkOutput] = useState("");

  const [honkInput, setHonkInput] = useState("");
  const [englishOutput, setEnglishOutput] = useState("");

  const [error, setError] = useState<string | null>(null);

  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  // Function to handle English to Honk64 translation
  const handleEnglishToHonk = () => {
    try {
      const honkEncoded = encode(englishInput);
      setHonkOutput(honkEncoded);
      setError(null);
      setCopySuccess(null); // Reset copy success message
    } catch (err: any) {
      setHonkOutput("");
      setError(err.message);
    }
  };

  // Function to handle Honk64 to English translation
  const handleHonkToEnglish = () => {
    try {
      const englishDecoded = decode(honkInput);
      setEnglishOutput(englishDecoded);
      setError(null);
      setCopySuccess(null); // Reset copy success message
    } catch (err: any) {
      setEnglishOutput("");
      setError(err.message);
    }
  };

  // Function to handle copying text to the clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess("Copied to clipboard!");
    setTimeout(() => setCopySuccess(null), 2000);
  };

  return (
    <Container size="md" style={{ textAlign: "center", paddingTop: "50px" }}>
      <Image alt="banner" h={400} src="/goose.webp" />

      <Title order={1} pt={"md"}>
        Honk64 Encoding
      </Title>
      <a href="https://github.com/briceyan/honk64/blob/master/README.md">
        <Text p={"sm"}>The Honk64 Spec</Text>
      </a>

      {/* Section for English to Honk64 */}
      <Textarea
        placeholder="Enter normal text here..."
        value={englishInput}
        onChange={(e) => setEnglishInput(e.target.value)}
        autosize
        minRows={4}
        style={{ marginBottom: "10px" }}
      />
      <Button fullWidth onClick={handleEnglishToHonk} style={{ marginBottom: "10px" }}>
        Honk64 Encode
      </Button>
      {/* Display Success or Error under button */}
      {honkOutput && !error && (
        <Group justify="space-between" mb={20}>
          <Text>{honkOutput}</Text>
          <CopyIconButton value={honkOutput} />
        </Group>
      )}
      {error && (
        <Text color="red" style={{ marginBottom: "20px" }}>
          {error}
        </Text>
      )}
      {/* Section for Honk64 to English */}
      <Textarea
        placeholder="Enter honk64-encoded text here..."
        value={honkInput}
        onChange={(e) => setHonkInput(e.target.value)}
        autosize
        minRows={4}
        style={{ marginBottom: "10px" }}
      />
      <Button fullWidth onClick={handleHonkToEnglish} style={{ marginBottom: "10px" }}>
        Honk64 Decode
      </Button>
      {/* Display Success or Error under button */}
      {englishOutput && !error && (
        <Group justify="space-between" mb={20}>
          <Text ff={"monospace"}>{englishOutput}</Text>
          <CopyIconButton value={englishOutput} />
        </Group>
      )}
      {error && (
        <Text color="red" style={{ marginBottom: "20px" }}>
          {error}
        </Text>
      )}
      {/* Copy Success message */}
      {copySuccess && <Text color="green">{copySuccess}</Text>}
    </Container>
  );
};

export default Home;
