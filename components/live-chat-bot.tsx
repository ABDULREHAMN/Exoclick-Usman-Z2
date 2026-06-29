"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Paperclip, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ChatMessage {
  id: string
  text: string
  sender: "customer" | "agent"
  timestamp: string
  avatar?: string
}

const FULL_CONVERSATION: ChatMessage[] = [
  // G1 - Initial Conversation
  {
    id: "g1-1",
    text: "Hello, my payment has been pending for several days. Could you please check what the issue is?",
    sender: "customer",
    timestamp: "09:18 AM",
  },
  {
    id: "g1-2",
    text: "Hello! Thank you for contacting us. I'll review your account and payment details. Please give me a moment while I check everything for you.",
    sender: "agent",
    timestamp: "09:19 AM",
  },
  {
    id: "g1-3",
    text: "Sure, I'll wait.",
    sender: "customer",
    timestamp: "09:20 AM",
  },
  {
    id: "g1-4",
    text: "Thank you for waiting. I've reviewed your account. At the moment your withdrawal is still pending because the linked Payoneer account isn't accepting incoming payments successfully.",
    sender: "agent",
    timestamp: "09:22 AM",
  },
  {
    id: "g1-5",
    text: "What exactly does that mean?",
    sender: "customer",
    timestamp: "09:23 AM",
  },
  {
    id: "g1-6",
    text: "It means our payment system attempted to prepare the transfer, but your Payoneer account couldn't accept the payment. This usually happens if the receiving account has a verification issue or isn't currently able to receive funds.",
    sender: "agent",
    timestamp: "09:24 AM",
  },
  {
    id: "g1-7",
    text: "I've already completed all my Payoneer verification. Here's my screenshot. Could you please check again?",
    sender: "customer",
    timestamp: "09:25 AM",
  },
  {
    id: "g1-8",
    text: "Certainly. I'll review your account one more time using the latest information you've provided. Please allow me another moment.",
    sender: "agent",
    timestamp: "09:27 AM",
  },
  {
    id: "g1-9",
    text: "Okay, thank you.",
    sender: "customer",
    timestamp: "09:28 AM",
  },
  {
    id: "g1-10",
    text: "I've completed another review. Your account verification appears to be complete, however your Payoneer account is still not accepting incoming transfers from our payment system. Because of that, we're unable to release your withdrawal at this time.",
    sender: "agent",
    timestamp: "09:31 AM",
  },
  {
    id: "g1-11",
    text: "So the problem isn't with my publisher account?",
    sender: "customer",
    timestamp: "09:32 AM",
  },
  {
    id: "g1-12",
    text: "Correct. Your publisher account looks fine. The issue is only with the current Payoneer receiving account. Your earnings are safe, but the payment cannot be completed until the withdrawal follows our supported process.",
    sender: "agent",
    timestamp: "09:33 AM",
  },
  // G2 - Continuation
  {
    id: "g2-1",
    text: "Is there any way to solve this immediately?",
    sender: "customer",
    timestamp: "09:35 AM",
  },
  {
    id: "g2-2",
    text: "Yes. I have reviewed your account and found that you currently have two pending withdrawal requests waiting to be processed. Because your current Payoneer account isn't accepting funds, both withdrawals will need to be cancelled before a new withdrawal can be created.",
    sender: "agent",
    timestamp: "09:36 AM",
  },
  {
    id: "g2-3",
    text: "Could you tell me which withdrawals are pending?",
    sender: "customer",
    timestamp: "09:37 AM",
  },
  {
    id: "g2-4",
    text: "Certainly. According to your account:\n\n• 05 Jun 2026 — $1,120.33 — Pending\n• 16 Jun 2026 — $1,280.33 — Pending\n\nBoth withdrawals are currently waiting for processing.",
    sender: "agent",
    timestamp: "09:38 AM",
  },
  {
    id: "g2-5",
    text: "If these withdrawals are cancelled, what happens next?",
    sender: "customer",
    timestamp: "09:39 AM",
  },
  {
    id: "g2-6",
    text: "After the cancellation is confirmed, the funds will return to your available balance. You can then submit a new withdrawal using a supported payment method.",
    sender: "agent",
    timestamp: "09:40 AM",
  },
  {
    id: "g2-7",
    text: "Can you simply change the Payoneer account and send the payment there?",
    sender: "customer",
    timestamp: "09:41 AM",
  },
  {
    id: "g2-8",
    text: "Unfortunately, no. For security and compliance reasons, we cannot redirect a payment that is already pending to another Payoneer account.",
    sender: "agent",
    timestamp: "09:42 AM",
  },
  {
    id: "g2-9",
    text: "Why is that?",
    sender: "customer",
    timestamp: "09:43 AM",
  },
  {
    id: "g2-10",
    text: "Once a withdrawal request has entered the payment queue, the payment destination becomes locked. To protect your account, we cannot modify the payment method until the current request has been cancelled.",
    sender: "agent",
    timestamp: "09:44 AM",
  },
  {
    id: "g2-11",
    text: "So cancelling is the only option?",
    sender: "customer",
    timestamp: "09:45 AM",
  },
  {
    id: "g2-12",
    text: "Yes. Based on your account, cancellation is the recommended and safest option. Once cancelled, you'll be able to submit a fresh withdrawal.",
    sender: "agent",
    timestamp: "09:46 AM",
  },
  {
    id: "g2-13",
    text: "Will my earnings remain safe after cancellation?",
    sender: "customer",
    timestamp: "09:47 AM",
  },
  {
    id: "g2-14",
    text: "Absolutely. Cancelling a withdrawal does not affect your earnings. The funds will simply return to your available balance and remain secure in your publisher account.",
    sender: "agent",
    timestamp: "09:48 AM",
  },
  // G3 - After Cancellation Confirmation
  {
    id: "g3-1",
    text: "✔ Withdrawal cancellation request submitted.",
    sender: "agent",
    timestamp: "09:50 AM",
  },
  {
    id: "g3-2",
    text: "Thank you. Your cancellation request has been received and processed successfully.",
    sender: "agent",
    timestamp: "09:50 AM",
  },
  {
    id: "g3-3",
    text: "Has everything been cancelled now?",
    sender: "customer",
    timestamp: "09:51 AM",
  },
  {
    id: "g3-4",
    text: "Yes. Both pending withdrawal requests have been cancelled successfully. The cancelled amounts have been returned to your available balance.",
    sender: "agent",
    timestamp: "09:52 AM",
  },
  {
    id: "g3-5",
    text: "What should I do now?",
    sender: "customer",
    timestamp: "09:53 AM",
  },
  {
    id: "g3-6",
    text: "You can now update your payment method and submit a brand-new withdrawal request. This new request will follow the normal payment schedule.",
    sender: "agent",
    timestamp: "09:54 AM",
  },
  {
    id: "g3-7",
    text: "Can I use another Payoneer account now?",
    sender: "customer",
    timestamp: "09:55 AM",
  },
  {
    id: "g3-8",
    text: "Yes. You may add a different verified Payoneer account before creating your next withdrawal request. Please make sure the account is fully verified and able to receive international payments.",
    sender: "agent",
    timestamp: "09:56 AM",
  },
  {
    id: "g3-9",
    text: "Can I use a crypto wallet instead of Payoneer?",
    sender: "customer",
    timestamp: "09:57 AM",
  },
  {
    id: "g3-10",
    text: "Yes. If cryptocurrency withdrawals are available for your account, you can update your payment method to a supported crypto wallet and submit your next withdrawal using that method.",
    sender: "agent",
    timestamp: "09:58 AM",
  },
  {
    id: "g3-11",
    text: "Great. I'll add my crypto wallet.",
    sender: "customer",
    timestamp: "09:59 AM",
  },
  {
    id: "g3-12",
    text: "Perfect. Once your wallet has been added and verified, you can create a new withdrawal request directly from the Payments section.",
    sender: "agent",
    timestamp: "10:00 AM",
  },
  {
    id: "g3-13",
    text: "Will the cancelled funds be included in my next withdrawal?",
    sender: "customer",
    timestamp: "10:01 AM",
  },
  {
    id: "g3-14",
    text: "Yes. The cancelled withdrawal amounts have already been returned to your available balance. When you submit a new withdrawal, those funds will be available for withdrawal again.",
    sender: "agent",
    timestamp: "10:02 AM",
  },
  {
    id: "g3-15",
    text: "Thank you for your help.",
    sender: "customer",
    timestamp: "10:03 AM",
  },
  {
    id: "g3-16",
    text: "You're very welcome. If you need any further assistance, we're always here to help. Have a great day!",
    sender: "agent",
    timestamp: "10:04 AM",
  },
  // G4 - Withdrawal Processing Conversation
  {
    id: "g4-1",
    text: "I have added my crypto wallet successfully and submitted a new withdrawal request.",
    sender: "customer",
    timestamp: "10:06 AM",
  },
  {
    id: "g4-2",
    text: "Great! I can confirm your crypto wallet has been added successfully and your new withdrawal request has been created.",
    sender: "agent",
    timestamp: "10:07 AM",
  },
  {
    id: "g4-3",
    text: "Can this withdrawal be completed today?",
    sender: "customer",
    timestamp: "10:08 AM",
  },
  {
    id: "g4-4",
    text: "Unfortunately, we cannot release withdrawals immediately. Every withdrawal follows our standard payment verification process before funds are released.",
    sender: "agent",
    timestamp: "10:09 AM",
  },
  {
    id: "g4-5",
    text: "What are the verification steps?",
    sender: "customer",
    timestamp: "10:10 AM",
  },
  {
    id: "g4-6",
    text: "Your withdrawal will follow these four stages:\n\n1. Withdrawal Request Submitted\n2. Account Under Review\n3. Wallet Verification\n4. Funds Sent Successfully",
    sender: "agent",
    timestamp: "10:11 AM",
  },
  {
    id: "g4-7",
    text: "I've already waited a long time. Can you speed it up?",
    sender: "customer",
    timestamp: "10:12 AM",
  },
  {
    id: "g4-8",
    text: "I understand your concern. While we cannot bypass our verification policy, I have submitted a priority review request for your withdrawal.",
    sender: "agent",
    timestamp: "10:13 AM",
  },
  {
    id: "g4-9",
    text: "How long will it take now?",
    sender: "customer",
    timestamp: "10:14 AM",
  },
  {
    id: "g4-10",
    text: "Standard processing may take several business days depending on verification. Since a priority review has been requested, we'll try to complete it as quickly as possible if there are no verification issues.",
    sender: "agent",
    timestamp: "10:15 AM",
  },
  {
    id: "g4-11",
    text: "Okay, please proceed.",
    sender: "customer",
    timestamp: "10:16 AM",
  },
  {
    id: "g4-12",
    text: "Done. Your priority request has been submitted successfully. We'll notify you as soon as your withdrawal status changes.",
    sender: "agent",
    timestamp: "10:17 AM",
  },
]

export default function LiveChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showPriorityConfirmation, setShowPriorityConfirmation] = useState(false)
  const [phase, setPhase] = useState<"g1-g2" | "g3" | "g4">("g1-g2")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const getCurrentTime = () => {
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")
    const period = now.getHours() >= 12 ? "PM" : "AM"
    const displayHours = now.getHours() % 12 || 12
    return `${String(displayHours).padStart(2, "0")}:${minutes} ${period}`
  }

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    // Add customer message
    const customerMessage: ChatMessage = {
      id: `custom-${Date.now()}`,
      text: text.trim(),
      sender: "customer",
      timestamp: getCurrentTime(),
    }

    setMessages((prev) => [...prev, customerMessage])
    setInput("")

    // Show typing indicator
    setIsTyping(true)

    // Wait 2-3 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 1000))

    // Add agent reply
    const agentMessage: ChatMessage = {
      id: `auto-reply-${Date.now()}`,
      text: "Thank you for contacting ExoClick Publisher Support. We've received your message successfully. Our support team will review your request shortly and get back to you as soon as possible.",
      sender: "agent",
      timestamp: getCurrentTime(),
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, agentMessage])

    // Check if we've reached the end of G4 conversation
    if (phase === "g4" && messages.length >= FULL_CONVERSATION.length - 2) {
      setTimeout(() => setShowPriorityConfirmation(true), 1500)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(input)
    }
  }

  const handleCancelConfirmation = (confirmed: boolean) => {
    if (confirmed) {
      // Update dashboard data
      updateDashboardAfterCancellation()
      setPhase("g3")
    }
    setShowConfirmation(false)
  }

  const updateDashboardAfterCancellation = () => {
    // Update available balance: return the two cancelled amounts ($1,120.33 + $1,280.33 = $2,400.66)
    // Previous balance was $1,230.54, new balance = $1,230.54 + $2,400.66 = $3,631.20
    const newAvailableBalance = 3631.20

    // Update withdrawal history - mark both as cancelled
    // Update dashboard statistics
    // This would typically be done via a state management system or API call
    // For now, we'll dispatch events that other components can listen to

    if (typeof window !== "undefined") {
      const event = new CustomEvent("withdrawalsCancelled", {
        detail: {
          availableBalance: newAvailableBalance,
          cancelledAmounts: [1120.33, 1280.33],
        },
      })
      window.dispatchEvent(event)
    }
  }

  const getDisplayMessages = (): ChatMessage[] => {
    if (phase === "g1-g2") {
      return FULL_CONVERSATION.slice(0, 28) // G1 + G2 messages
    } else if (phase === "g3") {
      return FULL_CONVERSATION.slice(0, 44) // G1 + G2 + G3 messages
    } else {
      return [...FULL_CONVERSATION, ...messages] // G1 + G2 + G3 + G4 + custom
    }
  }

  const displayMessages = getDisplayMessages()

  const showConfirmationDialogG1G2 =
    phase === "g1-g2" && displayMessages.length === FULL_CONVERSATION.slice(0, 28).length

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[600px] flex flex-col shadow-2xl border-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 border-b rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Sophia Wilson</h3>
                <div className="flex items-center gap-2 text-xs">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Live Support Agent</span>
                </div>
              </div>
              <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">Live Agent</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {displayMessages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.sender === "customer" ? "justify-end" : "justify-start"}`}>
                {msg.sender === "agent" && (
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    SW
                  </div>
                )}
                <div className={`flex flex-col ${msg.sender === "customer" ? "items-end" : "items-start"}`}>
                  <div
                    className={`max-w-xs rounded-lg px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.sender === "customer"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-xs text-gray-400 mt-1">{msg.timestamp}</span>
                </div>
                {msg.sender === "customer" && (
                  <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    U
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  SW
                </div>
                <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none px-4 py-2.5">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                  </div>
                </div>
              </div>
            )}

            {/* G1-G2 Confirmation Dialog */}
            {showConfirmationDialogG1G2 && (
              <div className="flex justify-center py-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center max-w-xs">
                  <p className="text-sm font-semibold text-yellow-800 mb-3">Cancel Pending Withdrawals?</p>
                  <p className="text-xs text-yellow-700 mb-4">
                    You currently have two pending withdrawals. Cancelling them will return the funds to your available balance so that you can submit a new withdrawal request.
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancelConfirmation(false)}
                      className="text-xs"
                    >
                      No, Keep Pending
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleCancelConfirmation(true)}
                      className="text-xs bg-blue-600 hover:bg-blue-700"
                    >
                      Yes, Cancel Withdrawals
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* G4 Withdrawal Confirmation Dialog */}
            {showPriorityConfirmation && (
              <div className="flex justify-center py-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center max-w-sm">
                  <p className="text-sm font-semibold text-blue-900 mb-3">Withdrawal Request Submitted</p>
                  <p className="text-xs text-blue-800 mb-4">
                    Your withdrawal request has been received successfully and is currently in the verification process.
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowPriorityConfirmation(false)}
                      className="text-xs"
                    >
                      OK
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setShowPriorityConfirmation(false)}
                      className="text-xs bg-blue-600 hover:bg-blue-700"
                    >
                      View Withdrawal Status
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t bg-white rounded-b-lg p-4 space-y-3">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 text-sm"
                disabled={phase !== "g4"}
              />
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10 text-gray-500 hover:text-gray-700"
                disabled={phase !== "g4"}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10 text-gray-500 hover:text-gray-700"
                disabled={phase !== "g4"}
              >
                <Smile className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                onClick={() => handleSendMessage(input)}
                disabled={!input.trim() || phase !== "g4"}
                className="h-10 w-10 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-400">
              {phase === "g4"
                ? "Press Enter or click Send to continue the conversation"
                : "Chat input available after initial conversation"}
            </p>
          </div>
        </Card>
      )}
    </>
  )
}
