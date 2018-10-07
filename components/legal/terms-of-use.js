import React, {Component} from 'react';
import Navbar from '../shared/navbar';
import Footer from '../shared/footer'
import { Match, Link } from 'react-router-dom'
import {User, Share} from 'react-feather'
export class TOS extends Component{
    constructor(props){
        super(props)
        
    }
    
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render(){
        
        return <div className="container-fluid"> 
<div className="row">
    <section className="help-center-section">
        <Navbar />  
        <div className="row-fluid hero-box">
        <div className="col-md-12">
            <div className="headline-box">
            
            <h1 className="home-headline">Terms of Use</h1>
            
            </div>
        </div>
        </div>
    </section>
</div>
 
 <div className="row-fluid new-article-row">
    <div className="col-md-2">
    </div>
    <div className="col-md-8">
    <div className="col-spaced help-box">
   
    <div className="row article-sub-row">
    <div className="col-md-12">
    
    <br/>
    <span className="content">
    <p><strong>Introduction</strong></p><p>These Site&#8217;s Terms and Conditions shall manage your use of this website. These Terms will be fully applied and determine how you use this Site. In using this Site, you consent to all terms and conditions written in here. You are obliged not use this Website in case of any misunderstanding with any of the mentioned Website Standard Terms.</p><p>Minors or individuals below 18 years old are forbidden from this Website.</p><p><strong>Intellectual Property Rights</strong></p><p>Other than the content you own, under these Terms, The Academist and its licensors own all intellectual property rights and materials within this Website.</p><p>You are granted a limited license only permitting viewing of the material contained on this Website.</p><p><strong>Data Attribution</strong></p><p>Directory Data is copyrighted material under license to<span> </span><a href="http://www.wintergreenorchardhouse.com/dataLease.php?subPageCat=dataHome&amp;pageCat=dataLease">Wintergreen Orchard House</a><span> </span>and which is reproduced by permission of Wintergreen Orchard House. All rights reserved.</p><p><strong>Restrictions</strong></p><p>The limitations are:</p><ul><li>from publishing any material from The Academist in any other media;</li><li>from selling, commercializing and sub selling any material from The Academist;</li><li>from publicly performing and showing any of The Academist material;</li><li>from using The Academist in any way that is or may be damaging to the site;</li><li>from using The Academist in any way that impacts user access to the site;</li><li>from using The Academist in a way that is against applicable laws and regulations, or in any way may cause harm to the site, or to any individual or business;</li><li>from engaging in any data mining activity, data harvesting, data extracting or any other activity that is similar to those above to The Academist</li><li>from the use of The Academist for advertising or marketing purposes.</li></ul><p>Certain parts of this site are restricted from your access, and The Academist may further restrict your access to any areas of the site, at any time, at the administrator&#8217;s absolute discretion. Specific user ID and password created for The Academist are confidential, and confidentiality must exist.</p><p><strong>Your Content</strong></p><p>In these site&#8217;s Terms and Conditions, “Your Content” is referenced to mean any sound clip, visual, images or by extension any other material displayed on the site. By posting Your Content, you grant The Academist a non-exclusive, worldwide, irrevocable, sublicense to utilize, recreate, adapt, print, translate and distribute it in all media.</p><p>Your Content must be your own and must not be invading any third-party’s rights. The Academist reserves the inherent right to withdraw any of Your Content from the site at any time without warning.</p><p><strong>No warranties</strong></p><p>The Academist is provided “as is,” with all faults, and The Academist express no form of representation or warranty, in any way that is related to the site or the materials contained on the site.</p><p><strong>Limitation of liability</strong></p><p>In no event shall The Academist, its officers, its directors, and its employees be held liable for any occurrence from the use of the site whether such liability is under contract.  Also, The Academist, its officers, its directors, and its employees will in no way be held liable in the case of any indirect, in consequence, or individual liability from your use of the site.</p><p><strong>Indemnification</strong></p><p>You at this moment are indemnified to the fullest extent to The Academist from and against all liabilities, expenses, demands, causes of action, damages and costs related to your actions in breach of any of the provisions given to these Terms and Conditions.</p><p><strong>Severability</strong></p><p>If any of the provisions provided in this Terms and Conditions is found to be in contravention under any applicable law, such provisions shall be repealed without affecting the remaining provisions herein.</p><p><strong>Variation of Terms</strong></p><p>The Academist can change these Terms and Conditions at the administrator&#8217;s discretion, and by using the site, you are expected to review these Terms and Conditions on a regular basis.</p><p><strong>Assignment</strong></p><p>The Academist is permitted to assign, transfer, and subcontract its rights, privileges, and obligations under these Terms and Conditions without any notification. However, you as the user are not allowed to assign, transfer, or subcontract any of your rights and obligations under these Terms.</p><p><strong>Entire Agreement</strong></p><p>These Terms and Conditions contain the full agreement between The Academist and you as the user about your use of the site and in turn supersede all previous terms of understanding.</p><p><strong>Governing Law &amp; Jurisdiction</strong></p><p>These Terms and Conditions will be governed by and interpreted by the constitutional laws of the State of Texas, and as the user, you submit to the non-exclusive jurisdiction of the specified state and federal courts in Texas for the resolution of any disputes.</p>
    </span>
    </div>
    
    </div>
    </div>
    </div>
    <div className="col-md-2">
    </div>
 </div>
<Footer />
</div>
        
    }
}