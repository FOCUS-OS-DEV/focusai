'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect, useRef } from 'react'

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [chatStep, setChatStep] = useState(0)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inView && chatStep < 10) {
      const timer = setTimeout(() => {
        setChatStep((prev) => prev + 1)
      }, chatStep === 0 ? 500 : 1000)
      return () => clearTimeout(timer)
    }
  }, [inView, chatStep])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0
    }
  }, [])

  useEffect(() => {
    if (chatContainerRef.current && chatStep > 0) {
      const container = chatContainerRef.current
      setTimeout(() => {
        const isOverflowing = container.scrollHeight > container.clientHeight
        if (isOverflowing) {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
          })
        }
      }, 50)
    }
  }, [chatStep])

  const benefits = [
    {
      title: 'למידה מעשית',
      desc: 'תתרגלו על כלים אמיתיים ותצאו עם פרויקט עובד',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: 'ליווי אקדמי',
      desc: 'בליווי היחידה ללימודי חוץ באוניברסיטת חיפה. התוכנית מועברת גם בטכניון',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
    },
    {
      title: 'קהילת בוגרים',
      desc: 'גישה לקהילה פעילה של אנשי AI ותמיכה מתמשכת',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'מרצים מהשטח',
      desc: 'יזמים ומנהלים שעובדים עם AI כל יום',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ]

  const chatMessages = [
    { type: 'user', text: 'היי, איך אני יכול לשלב AI במחלקת משאבי האנוש שלנו?' },
    { type: 'ai', text: 'היי! שאלה מעולה 🙌' },
    { type: 'ai', text: 'יש המון דרכים - מסינון קורות חיים אוטומטי, דרך בוטים לתיאום ראיונות, ועד ניתוח ביצועי עובדים. הכל תלוי במה אתם צריכים.' },
    { type: 'user', text: 'נשמע מדהים! איך אני לומד לעשות את זה?' },
    { type: 'ai', text: 'יש לנו כמה אפשרויות, תלוי מה המטרה שלך:' },
    { type: 'ai', text: '🤖 Bot-Camp - ללמוד לפתח סוכני AI ואוטומציות ולעסוק בזה כמקצוע', link: 'https://focusai.co.il/bot-camp/', linkText: 'Bot-Camp' },
    { type: 'ai', text: '🚀 AI Ready - ללמוד מאפס שימוש נכון בכלי AI לייעול העבודה והחיים האישיים', link: 'https://focusai.co.il/ai-ready/', linkText: 'AI Ready' },
    { type: 'ai', text: '🎯 סדנאות והרצאות AI - הרצאות וסדנאות מותאמות לארגונים וצוותים', link: 'https://focusai.co.il/ai-workshop/', linkText: 'סדנאות והרצאות AI' },
    { type: 'user', text: 'מעולה! איך ממשיכים?' },
    { type: 'ai', text: 'השאירו פרטים ונתאם שיחה קצרה 📞\n🎓 נתראה באקדמיה!', link: '#contact', linkText: 'השאירו פרטים' },
  ]

  return (
    <section
      id="about"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #fce7f3 0%, #f3e8ff 100%)',
      }}
    >
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2), transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          ref={ref}
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            למה Focus AI Academy?
          </h2>
          <p className="text-gray-600 text-lg">
            אנחנו לא עוד קורס אונליין. אנחנו מרכז הכשרות שמביא תוצאות.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 order-2 lg:order-1">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                className="p-5 rounded-2xl group bg-white/80 hover:bg-white border border-purple-100 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-100/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-500 mb-3 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-colors">
                  {benefit.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="order-1 lg:order-2 px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative w-[260px] sm:w-[280px] md:w-[300px] mx-auto">
              <div className="absolute inset-4 bg-black/30 rounded-[50px] blur-2xl translate-y-6" />
              <div className="relative bg-[#1a1a1a] rounded-[50px] p-[3px] shadow-2xl">
                <div className="bg-black rounded-[47px] p-[10px]">
                  <div className="relative bg-black rounded-[38px] overflow-hidden">
                    <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[85px] h-[24px] bg-[#1a1a1a] rounded-full z-30 border border-gray-800" />
                    <div className="pt-[38px] px-6 pb-2 flex items-center justify-between text-white text-[11px] font-medium bg-black">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="flex items-end gap-[1px] h-3">
                          <div className="w-[3px] h-[4px] bg-white rounded-[1px]" />
                          <div className="w-[3px] h-[6px] bg-white rounded-[1px]" />
                          <div className="w-[3px] h-[8px] bg-white rounded-[1px]" />
                          <div className="w-[3px] h-[10px] bg-white rounded-[1px]" />
                        </div>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                        </svg>
                        <div className="flex items-center gap-[2px]">
                          <div className="w-[22px] h-[11px] border-[1.5px] border-white rounded-[3px] flex items-center p-[2px]">
                            <div className="w-[14px] h-full bg-green-500 rounded-[1px]" />
                          </div>
                          <div className="w-[2px] h-[5px] bg-white rounded-r-sm" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#075E54] px-2 py-1.5">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-white flex items-center justify-center flex-shrink-0">
                          <img
                            src="https://res.cloudinary.com/dfudxxzlj/image/upload/v1765367021/FOCUSAI_LOGO-02_3_keeam5.png"
                            alt="Focus AI"
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold text-[12px] whitespace-nowrap">Focus AI Academy</p>
                          <p className="text-white/80 text-[10px]">מקליד...</p>
                        </div>
                      </div>
                    </div>

                    <div
                      ref={chatContainerRef}
                      className="h-[320px] sm:h-[340px] overflow-y-auto p-2 space-y-1"
                      style={{
                        background: '#ECE5DD',
                      }}
                    >
                      {chatMessages.map((msg, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={chatStep > index ? { opacity: 1, y: 0, scale: 1 } : {}}
                          transition={{ duration: 0.3 }}
                          className={`flex ${msg.type === 'user' ? 'justify-start' : 'justify-end'}`}
                        >
                          <div
                            className={`relative max-w-[85%] px-2 py-1.5 text-[11px] shadow-sm ${
                              msg.type === 'user'
                                ? 'bg-white text-gray-800 rounded-lg rounded-tr-none'
                                : 'bg-[#D9FDD3] text-gray-800 rounded-lg rounded-tl-none'
                            }`}
                          >
                            <p className="whitespace-pre-line leading-snug">
                              {msg.link ? (
                                <>
                                  {msg.text.split(msg.linkText!)[0]}
                                  <a
                                    href={msg.link}
                                    target={msg.link.startsWith('http') ? '_blank' : undefined}
                                    rel={msg.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="text-[#0066CC] underline hover:text-[#0052A3] font-medium"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {msg.linkText}
                                  </a>
                                  {msg.text.split(msg.linkText!)[1]}
                                </>
                              ) : (
                                msg.text
                              )}
                            </p>
                            <div className="flex items-center justify-end gap-1 mt-0.5">
                              <span className="text-[9px] text-gray-500">12:34</span>
                              {msg.type === 'ai' && (
                                <svg className="w-3.5 h-3.5 text-[#53BDEB]" viewBox="0 0 16 11" fill="currentColor">
                                  <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.405-2.272a.463.463 0 0 0-.336-.146.47.47 0 0 0-.343.146l-.311.31a.445.445 0 0 0-.14.337c0 .136.047.25.14.343l2.996 2.996a.724.724 0 0 0 .502.203.697.697 0 0 0 .546-.266l6.646-8.417a.497.497 0 0 0 .108-.299.441.441 0 0 0-.14-.305l-.388-.342zm3.606 0a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-1.009-.953-.61.755 1.36 1.36a.724.724 0 0 0 .502.203.697.697 0 0 0 .546-.266l6.646-8.417a.497.497 0 0 0 .108-.299.441.441 0 0 0-.14-.305l-.528-.79z"/>
                                </svg>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {chatStep > 0 && chatStep < 11 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex justify-end"
                        >
                          <div className="bg-[#D9FDD3] px-3 py-2 rounded-lg rounded-tl-none shadow-sm">
                            <div className="flex gap-1">
                              <motion.span
                                className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                              />
                              <motion.span
                                className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                              />
                              <motion.span
                                className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div className="bg-[#F0F0F0] px-2 py-1.5 flex items-center gap-1.5">
                      <div className="flex-1 bg-white rounded-full px-3 py-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-[12px] text-gray-400 flex-1">הודעה</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#00A884] flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                      </div>
                    </div>

                    <div className="bg-[#F0F0F0] pb-1 pt-2">
                      <div className="w-32 h-1 bg-black rounded-full mx-auto" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute left-[-2px] top-28 w-[3px] h-8 bg-[#2a2a2a] rounded-l-sm" />
              <div className="absolute left-[-2px] top-40 w-[3px] h-14 bg-[#2a2a2a] rounded-l-sm" />
              <div className="absolute left-[-2px] top-56 w-[3px] h-14 bg-[#2a2a2a] rounded-l-sm" />
              <div className="absolute right-[-2px] top-36 w-[3px] h-20 bg-[#2a2a2a] rounded-r-sm" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
