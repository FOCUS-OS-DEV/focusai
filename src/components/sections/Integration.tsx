'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const WEBHOOK_URL = 'https://focus2025.app.n8n.cloud/webhook/06374873-ea8a-4d27-bfa2-453ab2bf03d8'

const Integration = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [formData, setFormData] = useState({ name: '', phone: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const data = {
      ...formData,
      source: 'academy-integration-section',
      timestamp: new Date().toISOString(),
    }

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify(data),
      })
      setIsSuccess(true)
      const fbq = (window as unknown as { fbq?: (action: string, event: string) => void }).fbq
      if (typeof fbq === 'function') fbq('track', 'Lead')
    } catch {
      setIsSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'סוכני AI מותאמים',
      description: 'פיתוח סוכנים חכמים שמבינים את העסק שלכם',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: 'אוטומציות מקצה לקצה',
      description: 'חיסכון של שעות עבודה בתהליכים חוזרים',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'הטמעה מהירה',
      description: 'פתרונות שעובדים - מהשבוע הראשון',
    },
  ]

  return (
    <section
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #150d25 0%, #1a1030 50%, #0f0a1e 100%)',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/4 w-[600px] h-[600px] opacity-20 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5), transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-sm font-medium text-blue-400">מחלקת האינטגרציה</span>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              ללמוד ממי שעושים את זה
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> כל יום</span>
            </motion.h2>

            <motion.p
              className="text-lg text-white/60 mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              המרצים שלנו לא רק מלמדים - הם מפתחים סוכני AI ואוטומציות לעסקים מובילים בישראל, כל יום.
              כשאתם לומדים אצלנו, אתם מקבלים ידע מעשי שנבנה מניסיון אמיתי בשטח.
            </motion.p>

            <motion.p
              className="text-white/50 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              צריכים פתרון AI מותאם לעסק שלכם? מחלקת האינטגרציה שלנו מפתחת סוכנים חכמים ואוטומציות מקצה לקצה - אפיון, פיתוח והטמעה.
            </motion.p>

            {/* Features */}
            <motion.div
              className="grid sm:grid-cols-3 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1">{feature.title}</h3>
                  <p className="text-white/50 text-xs">{feature.description}</p>
                </div>
              ))}
            </motion.div>

            {/* Form + CTA */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold">תודה!</p>
                      <p className="text-white/50 text-sm">נחזור אליכם בקרוב</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-blue-500/30 text-white placeholder-white/40 focus:border-blue-400 focus:bg-white/15 focus:outline-none transition-all"
                      placeholder="שם מלא"
                    />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-blue-500/30 text-white placeholder-white/40 focus:border-blue-400 focus:bg-white/15 focus:outline-none transition-all"
                      placeholder="טלפון"
                    />
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 rounded-xl text-white font-bold disabled:opacity-50 transition-all whitespace-nowrap"
                      style={{
                        background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                        boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
                      }}
                      whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? 'שולח...' : 'צרו קשר'}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Link to website */}
              <motion.a
                href="https://focusai.co.il/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors group"
                whileHover={{ x: -4 }}
              >
                <span>או בקרו באתר שירותי הפיתוח שלנו</span>
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.a>
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              className="relative p-[2px] rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(6, 182, 212, 0.3), transparent)',
              }}
            >
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-3xl opacity-50 blur-2xl -z-10"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(6, 182, 212, 0.2))',
                }}
              />

              <div className="bg-[#0f0a1e] rounded-3xl p-8 md:p-10">
                {/* Code-like visual */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-white/30 text-sm mr-4 font-mono">focus-ai-agent.js</span>
                  </div>

                  <div className="font-mono text-sm space-y-2">
                    <p><span className="text-purple-400">const</span> <span className="text-blue-300">agent</span> = <span className="text-yellow-300">createAgent</span>({'{'}</p>
                    <p className="pr-4"><span className="text-green-300">name</span>: <span className="text-orange-300">&quot;AI Assistant&quot;</span>,</p>
                    <p className="pr-4"><span className="text-green-300">capabilities</span>: [</p>
                    <p className="pr-8"><span className="text-orange-300">&quot;automation&quot;</span>,</p>
                    <p className="pr-8"><span className="text-orange-300">&quot;data-analysis&quot;</span>,</p>
                    <p className="pr-8"><span className="text-orange-300">&quot;smart-responses&quot;</span></p>
                    <p className="pr-4">],</p>
                    <p className="pr-4"><span className="text-green-300">business</span>: <span className="text-cyan-300">yourBusiness</span></p>
                    <p>{'}'});</p>
                    <p className="mt-4"><span className="text-purple-400">await</span> agent.<span className="text-yellow-300">deploy</span>(); <span className="text-white/30">{`// Ready!`}</span></p>
                  </div>

                  {/* Animated cursor */}
                  <motion.div
                    className="inline-block w-2 h-5 bg-blue-400"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Integration
