import { CustomIcon } from "@/components/CustomIcon";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";

export const MessengerMessageTextarea = (p: {
  value: string;
  onInput: (x: string) => void;
  disabled: boolean;
  onSubmit: (p: { text: string }) => void;
}) => {
  const [innerValue, setInnerValue] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => setInnerValue(p.value), [p.value]);
  useEffect(() => p.onInput(innerValue), [innerValue]);
  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [innerValue]);

  return (
    <div className="relative">
      <Textarea
        ref={textareaRef}
        value={innerValue}
        onInput={(e) => {
          const value = (e.target as unknown as { value: string }).value;
          setInnerValue(value);
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
          if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            e.preventDefault();
            if (p.disabled) return;
            return p.onSubmit({ text: innerValue });
          }
        }}
        className={`w-full resize-none rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
        rows={1}
        style={{ minHeight: "80px", maxHeight: "160px" }}
      />
      <Button
        onClick={(e) => {
          e.preventDefault();
          p.onSubmit({ text: innerValue });
        }}
        disabled={p.disabled}
        className="absolute bottom-2 right-2 h-8 w-8 p-0"
      >
        <CustomIcon iconName="Upload" size="sm" />
      </Button>
    </div>
  );
};
