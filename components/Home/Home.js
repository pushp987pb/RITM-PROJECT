
import React from 'react';
import './Home.css';

function Home() {
  return (
    <>
      <div className="hero-section">
        {/* Replace the dummy image URL with your actual image URL */}
        <img
          className="hero-image"
          src="https://pragyata.com/wp-content/uploads/2020/08/hindu-temple.jpg" alt="Hero Section"
        />
        <div className="hero-content">
          <h1 className="hero-heading">Welcome to Our  Temple Management System</h1>
          {/* Add more content for the hero section if needed */}
        </div>
      </div>

      
        {/* Add more content for the main section of the page */}
        <h2 className='text-center display-6 lead text-primary'>About Us</h2>
        
        <section class="stories">
            <div class="stories-wrapper">
                <div class="story-bg">
                    <div class="story">
                        <img src="https://cdn.pixabay.com/photo/2016/08/21/19/48/temple-1610623_640.jpg" alt="customer-image" class="story-image"/>
                        <div class="story-text">
                            <h1 class="story-heading">These were best days of this year</h1>
                            <p class="story-paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                               Architecto quas, repudiandae veritatis nam mollitia cumquedistinctio, 
                               quia aperiam aliquid at consequuntur liberoquisquam facilis laborum inventore repellat perspiciatis vel 
                               fugiat molestias recusandae eum necessitatibus quo possimusaspernatur? Nobis, architecto eaque.</p>
                        </div>
                    </div>
                </div>
                <div class="story-bg">
                    <div class="story">
                        <img src="https://cdn.pixabay.com/photo/2016/08/21/19/48/temple-1610623_640.jpg" alt="customer-image" class="story-image"/>
                        <div class="story-text">
                            <h1 class="story-heading">I enjoyes this great tour</h1>
                            <p class="story-paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                               Architecto quas, repudiandae veritatis nam mollitia cumquedistinctio,
                                quia aperiam aliquid at consequuntur liberoquisquam facilis laborum inventore repellat 
                                perspiciatis vel fugiat molestias recusandae eum necessitatibus quo possimusaspernatur? Nobis,
                                 architecto eaque.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
}
export default Home;
