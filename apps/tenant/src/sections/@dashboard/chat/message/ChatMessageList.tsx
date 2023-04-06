import { useEffect, useState, useRef } from 'react';
// @types
import { IChatConversation } from '../../../../@types/chat';
//
import Scrollbar from '../../../../components/scrollbar';
import Lightbox from '../../../../components/lightbox';
import ChatMessageItem from './ChatMessageItem';

// ----------------------------------------------------------------------

type Props = {
  conversation: IChatConversation;
};

export default function ChatMessageList({ conversation }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [openLightbox, setOpenLightbox] = useState(false);

  const [selectedImage, setSelectedImage] = useState<number>(0);

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
  }, [conversation.messages]);

  const imagesLightbox = conversation.messages
    .filter((messages) => messages.contentType === 'image')
    .map((messages) => messages.body);

  const handleOpenLightbox = (url: string) => {
    const selectedImage = imagesLightbox.findIndex((index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  const handleCloseLightbox = () => {
    setOpenLightbox(false);
  };

  return (
    <>
      <Scrollbar
        scrollableNodeProps={{
          ref: scrollRef,
        }}
        sx={{ p: 3, height: 1 }}
      >
        {conversation.messages.map((message) => (
          <ChatMessageItem
            key={message.id}
            message={message}
            conversation={conversation}
            onOpenLightbox={handleOpenLightbox}
          />
        ))}
      </Scrollbar>

      <Lightbox
        images={imagesLightbox}
        mainSrc={imagesLightbox[selectedImage]}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        open={openLightbox}
        onCloseRequest={handleCloseLightbox}
      />
    </>
  );
}
