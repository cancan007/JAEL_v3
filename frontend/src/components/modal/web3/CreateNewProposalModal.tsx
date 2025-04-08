import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  UseDisclosureProps,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface CreateNewProposalModalProps {
  value: any;
  errors: any;
  setForm: (any: any) => void;
  onSubmit: () => void;
  disclosure: UseDisclosureProps;
  isLoading: boolean;
}

export const CreateNewProposalModal: React.FC<CreateNewProposalModalProps> = ({
  value,
  errors,
  setForm,
  onSubmit,
  disclosure,
  isLoading,
}) => {
  const { isOpen, onClose } = disclosure;
  const markdown = `
# 見出し1
## 見出し2
- リスト項目1
- リスト項目2
`;
  const markdown2 = `### Markdown 
            
1. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni, nemo!

- METHOD
- PURPOSE
`;
  return (
    <Modal
      isOpen={isOpen ? isOpen : false}
      onClose={onClose ? onClose : () => {}}
      size={"full"}
    >
      <ModalOverlay />
      <ModalContent bg={"#040D2E"} color={"white"}>
        <ModalHeader>New proposal form</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          pb={6}
          display={"flex"}
          flexDir={"row"}
          gap={"16px"}
          justifyContent={"space-between"}
        >
          <Box flex={1} overflowY={"auto"}>
            <ReactMarkdown
              className={"markdown"} //TailWindCSSでスタイルがおかしくなるので、basic.cssでmarkdownクラスでは全てrevertされるようにした
              remarkPlugins={[remarkGfm]}
            >
              {value.detail}
            </ReactMarkdown>
          </Box>
          <Box border={"1px solid #5F5F5F"}></Box>
          <Box display={"flex"} flexDir={"column"} gap={"16px"} flex={1}>
            <FormControl isRequired={true} isInvalid={errors.title}>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                value={value.title}
                onChange={(e) =>
                  setForm((pre: any) => ({ ...pre, title: e.target.value }))
                }
              />
              {errors.title && (
                <FormErrorMessage>{errors.title}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired={true} isInvalid={errors.detail}>
              <FormLabel>Detail (Markdown)</FormLabel>
              <Textarea
                minH={"400px"}
                placeholder="Please write the detail of proposal in markdown."
                value={value.detail}
                onChange={(e) =>
                  setForm((pre: any) => ({
                    ...pre,
                    detail: e.target.value,
                  }))
                }
              />
              {errors.detail && (
                <FormErrorMessage>{errors.detail}</FormErrorMessage>
              )}
            </FormControl>
          </Box>
        </ModalBody>

        <ModalFooter>
          {isLoading ? (
            <Box mx={"auto"}>
              <CircularProgress isIndeterminate color="green.300" />
            </Box>
          ) : (
            <>
              <Button colorScheme="blue" mr={3} onClick={() => onSubmit()}>
                Propose
              </Button>
              <Button
                onClick={onClose ? () => onClose() : () => {}}
                color={"black"}
              >
                Cancel
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
