import Link from "next/link";
import { Activity, ArrowRight, BrainCircuit, ClipboardCheck, Stethoscope } from "lucide-react";

export default function Home() {
  return <main className="shell">
    <header className="topbar">
      <div className="brand"><div className="brandMark"><Stethoscope size={22}/></div><div className="brandText">Doktor Karangan AI<small>Diagnosis • Rawat • Perbaik</small></div></div>
      <div className="navActions"><Link className="btn btnGhost hideMobile" href="/teacher">Portal Guru</Link><Link className="btn btnPrimary" href="/student">Masuk Klinik</Link></div>
    </header>
    <section className="hero">
      <div><span className="eyebrow"><BrainCircuit size={16}/> Literasi AI melalui Bahasa Melayu</span><h1>Karangan ialah pesakit. Anda doktornya.</h1><p className="lead">Murid menilai, mendiagnosis dan merawat kelemahan karangan AI—kemudian membandingkan pertimbangan mereka dengan pendapat kedua AI.</p><div className="heroActions"><Link className="btn btnPrimary" href="/teacher">Bina Klinik <ArrowRight size={18}/></Link><Link className="btn btnGhost" href="/student">Sertai sebagai Murid</Link></div></div>
      <div className="heroCard"><div className="patientHead"><div><b>Fail Pesakit #AI-026</b><small style={{display:"block",color:"var(--muted)",marginTop:4}}>Karangan Ekspositori • G3</small></div><span className="pulse"/></div><div className="essayLines"><span/><span/><span/><span/><span/></div><div className="diagnosisTag">Simptom dikesan: Huraian lemah</div></div>
    </section>
    <section className="statsStrip"><div className="stat"><ClipboardCheck/><b>7 langkah</b><span>daripada pemeriksaan awal hingga laporan akhir</span></div><div className="stat"><Activity/><b>Skor tepat</b><span>ukur ketepatan diagnosis, bukan sekadar penyertaan</span></div><div className="stat"><BrainCircuit/><b>AI dikritik</b><span>murid menilai AI dan tidak menerimanya sebagai autoriti mutlak</span></div></section>
  </main>
}
