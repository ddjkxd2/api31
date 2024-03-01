const express = require('express');
const axios = require('axios');
const { Readable } = require('stream');

const app = express();

// List of predefined meme image URLs (including GIFs)
const memeURLs = [
  'https://i.imgur.com/wvCD913.jpeg',
  'https://i.imgur.com/ZBqNISF.jpeg',
   'https://i.imgur.com/wvCD913.jpeg',
  'https://i.imgur.com/ZBqNISF.jpeg',
  'https://i.imgur.com/gRjaI1t.jpeg',
  'https://i.imgur.com/egzFP1W.jpeg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9w_yjFEW6rfqhu8bY-iGEzWyE_JvfMnaaNxBGLGuG&s',
  'https://i.imgflip.com/7axgiz.jpg',
  'https://i.imgur.com/j2cDtLH.jpeg',
  'https://i.imgur.com/BxEDrtl.jpeg',
  'https://i.imgur.com/3Yv8Qdf.jpeg',
  'https://i.imgur.com/N8wOEyL.jpeg',
  'https://i.imgur.com/BKW1QJl.jpeg',
  'https://i.imgur.com/JaJ7o4R.jpeg',
  'https://i.imgur.com/VhZ523c.jpeg',
  'https://i.imgur.com/3ugXNkm.jpeg',
  'https://i.imgur.com/cPsaY8F.jpeg',
  'https://i.imgur.com/pZTMqoc.jpeg',
  'https://i.imgur.com/vgvYVYs.jpeg',
  'https://i.imgur.com/BqdGQPl.jpeg',
  'https://i.redd.it/jc7xe8yosdx61.jpg',
  'https://i.redd.it/9x1qkjpxpbx61.jpg',
  'https://i.redd.it/qxmla44li9x61.png',
  'https://i.redd.it/tgyycep5a9x61.jpg',
  'https://i.redd.it/owu6epj019x61.jpg',
  'https://i.redd.it/dxuh8wg5n8x61.jpg',
  'https://i.redd.it/81u3y9ly9xw61.png',
  'https://i.redd.it/u7flk1okpww61.jpg',
  'https://i.redd.it/h9cn5pqlzvw61.jpg',
  'https://i.redd.it/pbcliz781ww61.jpg',
  'https://i.redd.it/xfbhw30l9vw61.jpg',
  'https://i.redd.it/k3pduaofesw61.jpg',
  'https://i.redd.it/mm9rcf3n7vw61.png',
  'https://i.redd.it/1gucc7iixrw61.jpg',
  'https://i.redd.it/8v7lcbd1cpw61.jpg',
  'https://i.redd.it/pw3rmvntnpw61.jpg',
  'https://i.redd.it/dyj1woin7lw61.png',
  'https://i.redd.it/cmaopnoeblw61.jpg',
  'https://i.redd.it/moej4vpbxjw61.jpg',
  'https://i.imgur.com/YSYyrXT.jpg',
  'https://i.redd.it/sm20ivdbjhw61.jpg',
  'https://i.redd.it/xt686ttwhhw61.jpg',
  'https://i.redd.it/7i1ypzftydw61.jpg',
  'https://i.redd.it/jva227mmwcw61.jpg',
  'https://i.redd.it/3q1xcv8esew61.jpg',
  'https://i.redd.it/im4m6m02u9w61.jpg',
  'https://i.redd.it/zxttlr4ig0w61.jpg',
  'https://i.redd.it/65lkn14fcxv61.jpg',
  'https://i.redd.it/xmj8q10msuv61.jpg',
  'https://i.redd.it/riak5rpgarv61.jpg',
  'https://i.redd.it/lgjc8fnmbqv61.jpg',
  'https://i.redd.it/3rmgdynqejv61.png',
  'https://i.redd.it/blow-your-birthday-candle-child-v0-w9va1a37fm4b1.jpg?s=c3b6f561c059474f07cb2be7d370c50f21c4d6bc',
  'https://i.redd.it/4dwamtuuzuab1.jpg',
  'https://i.redd.it/more-oceangate-memes-v0-3ymgegpcz68b1.jpg?s=9a052c4b03446ae63cae4b35bef8a4344af07d23',
  'https://i.redd.it/cs3vav6sog7b1.gif',
  'https://i0.wp.com/comicsandmemes.com/wp-content/uploads/titan-sub-oceangate-memes-2023-hide-and-seek-champions.jpg?w=960&ssl=1',
  'https://i0.wp.com/comicsandmemes.com/wp-content/uploads/titan-sub-oceangate-memes-how-do-you-think-people-are-acting.jpg?w=860&ssl=1',
  'https://i0.wp.com/comicsandmemes.com/wp-content/uploads/titan-sub-oceangate-memes-me-lookinf-for-billionaires-walelt-under-the-sea.jpg?w=468&ssl=1',
  'https://i0.wp.com/comicsandmemes.com/wp-content/uploads/titan-sub-oceangate-memes-me-upset-throws-controller-everyone-else.jpg?resize=654%2C1024&ssl=1',
  'https://i.redd.it/cs3vav6sog7b1.gif',
  'https://i0.wp.com/comicsandmemes.com/wp-content/uploads/titan-sub-oceangate-memes-please-reconnect-controller.jpg?w=960&ssl=1',
  'https://i0.wp.com/comicsandmemes.com/wp-content/uploads/titan-sub-oceangate-memes-whales-its-safe-send-more-bang-bang.jpg?w=860&ssl=1',
  'https://pbs.twimg.com/media/FzNvdLgXoAAf9zO?format=jpg&name=small',
  'https://i.redd.it/the-oceangate-titan-was-crushed-instantly-v0-vs6plsr0jw7b1.png?s=b1c9004c548a2895023a5507b8118cedd1e4af6b',
  'https://i.kym-cdn.com/photos/images/original/002/610/722/053.jpg',
  'https://i.redd.it/ymaum4vvem7b1.gif',
  'https://i.kym-cdn.com/photos/images/original/002/610/153/d14.jpg',
  'https://i.redd.it/my-meme-submission-for-the-oceangate-titan-submersible-v0-m1vd0lfnsd8b1.jpg?s=146bc46f6e4e58fe5332744f04a668b3e8eed14a',
  'https://starecat.com/content/wp-content/uploads/oceangate-titan-i-hope-that-lost-submarine-has-enough-oxygen-meanwhile-the-submarine-george-floyd.jpg',
  'https://img-9gag-fun.9cache.com/photo/az2QByj_460s.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqSo-c1eZ6qB2dH3-c29IclNhodOiNaaRDV616v4ttHyLkNe16OBDj07Zg5FLTqSsdIq0&usqp=CAU',
  'https://i.kym-cdn.com/photos/images/newsfeed/001/256/190/fd0.jpg',
  'https://i.redd.it/ob4v9felxub41.jpg',
  'https://i.redd.it/rqetb9i2osr61.jpg',
  'https://i.redd.it/jtom6ulleb251.jpg',
  'https://i.redd.it/ojaljm69lsp71.jpg',
  'https://i.redd.it/kifghpt5byh71.jpg',
  'https://i.redd.it/dr7ba9yfcby31.jpg',
  'https://preview.redd.it/zmftfhr2pso51.jpg?auto=webp&s=3bdb599364fb19f9d198173c7ecbf42691202937',
  'https://pbs.twimg.com/media/DfkCdV1X0AAVI8V.jpg',
  'https://i.redd.it/26yxed9av5j51.jpg',
  'https://i.imgur.com/PwJYASl.jpeg',
  'https://img-9gag-fun.9cache.com/photo/aDoYvAZ_460s.jpg',
  'https://miro.medium.com/v2/resize:fit:799/1*mb1T1DVK7vpdcd8ShhKxVw.jpeg',
  
];

app.get('/api/meme', async (req, res) => {
  try {
    if (memeURLs.length === 0) {
      res.status(404).json({ error: "No memes found." });
      return;
    }

    const randomMemeURL = memeURLs[Math.floor(Math.random() * memeURLs.length)];

    // Fetch the meme image data from the URL
    const response = await axios.get(randomMemeURL, { responseType: 'arraybuffer' });
    const memeData = response.data;

    // Create a Readable stream from the binary image data
    const memeStream = new Readable();
    memeStream.push(memeData);
    memeStream.push(null);

    // Set the response header based on the file type (image or gif)
    const isGif = randomMemeURL.endsWith('.gif');
    if (isGif) {
      res.setHeader('Content-Type', 'image/gif');
    } else {
      res.setHeader('Content-Type', 'image/jpeg');
    }

    // Pipe the memeStream to the response object, sending the image or gif
    memeStream.pipe(res);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error fetching memes." });
  }
});

const PORT = 3000; // Change this to your desired port number
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
