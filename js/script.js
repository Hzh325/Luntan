// 模拟数据 - 实际部署时替换为GitHub API调用
const mockDiscussions = [
    {
        id: 1,
        number: 1,
        title: "如何高效使用GitHub Actions进行CI/CD？",
        body: "最近在研究GitHub Actions，发现它非常强大。想和大家分享一些最佳实践：\n\n1. **使用缓存**：缓存依赖项可以大大加快构建速度\n2. **矩阵构建**：同时测试多个版本和环境\n3. **环境变量**：合理使用secrets管理敏感信息\n\n大家有什么经验可以分享吗？",
        author: "DevOpsEnthusiast",
        date: "2023-07-15",
        category: "tech",
        commentCount: 8,
        viewCount: 245
    },
    {
        id: 2,
        number: 2,
        title: "寻找开源项目贡献者 - 前端开发",
        body: "我们正在开发一个开源的数据可视化工具，需要前端开发者的帮助。项目使用React和D3.js。\n\n**主要任务：**\n- 实现新的图表组件\n- 优化现有组件的性能\n- 改进用户界面\n\n如果你有兴趣，请访问我们的GitHub仓库查看详情。",
        author: "OpenSourceLeader",
        date: "2023-07-14",
        category: "project",
        commentCount: 12,
        viewCount: 321
    },
    {
        id: 3,
        number: 3,
        title: "GitHub Pages部署失败问题求助",
        body: "我在部署GitHub Pages时遇到了问题，错误信息如下：\n\n```\nBuild failed: Error: Failed to build site\n```\n\n我的仓库结构如下：\n- index.html\n- css/style.css\n- js/main.js\n\n我已经检查了所有路径都是正确的，但还是无法部署成功。有人遇到过类似的问题吗？",
        author: "WebDevNewbie",
        date: "2023-07-12",
        category: "help",
        commentCount: 5,
        viewCount: 178
    },
    {
        id: 4,
        number: 4,
        title: "社区规则更新公告",
        body: "各位社区成员：\n\n为了维护更好的讨论环境，我们对社区规则进行了以下更新：\n\n1. **禁止垃圾信息**：任何形式的广告和推广内容将被立即删除\n2. **尊重他人**：禁止人身攻击和歧视性言论\n3. **内容相关**：所有讨论应围绕GitHub和开发相关主题\n\n希望大家共同维护一个积极健康的社区环境！",
        author: "CommunityManager",
        date: "2023-07-10",
        category: "announce",
        commentCount: 3,
        viewCount: 156
    }
];

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取当前页面路径
    const path = window.location.pathname.split('/').pop();
    
    if (path === 'index.html' || path === '') {
        // 首页逻辑
        renderPosts();
        setupEventListeners();
    } else if (path === 'post.html') {
        // 帖子详情页逻辑
        loadPostDetails();
    }
});

// 渲染帖子列表
function renderPosts() {
    const container = document.getElementById('postsContainer');
    container.innerHTML = '';
    
    // 获取过滤条件
    const categoryFilter = document.getElementById('categoryFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    
    // 过滤和排序帖子
    let posts = [...mockDiscussions];
    
    if (categoryFilter !== 'all') {
        posts = posts.filter(post => post.category === categoryFilter);
    }
    
    if (sortFilter === 'newest') {
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
        // 按热度排序（评论数+查看数）
        posts.sort((a, b) => (b.commentCount + b.viewCount) - (a.commentCount + a.viewCount));
    }
    
    // 渲染帖子
    if (posts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-comments"></i>
                <h3>暂无讨论</h3>
                <p>成为第一个发起讨论的人吧！</p>
                <button class="btn btn-primary mt-2" id="newPostEmptyBtn">
                    <i class="fas fa-plus me-1"></i>创建新帖子
                </button>
            </div>
        `;
        document.getElementById('newPostEmptyBtn').addEventListener('click', createNewPost);
        return;
    }
    
    posts.forEach(post => {
        const categoryLabel = getCategoryLabel(post.category);
        const excerpt = post.body.substring(0, 120) + '...';
        
        const postElement = document.createElement('div');
        postElement.className = 'post-card';
        postElement.innerHTML = `
            <div class="post-header">
                <span class="post-category">${categoryLabel}</span>
                <h3 class="post-title">
                    <a href="post.html?discussion=${post.number}">${post.title}</a>
                </h3>
                <p class="post-excerpt">${excerpt}</p>
                <div class="post-meta">
                    <span class="post-author">${post.author}</span>
                    <span class="post-date">${post.date}</span>
                </div>
            </div>
            <div class="post-footer">
                <div class="post-stats">
                    <span>
                        <i class="far fa-comment"></i> ${post.commentCount} 评论
                    </span>
                    <span>
                        <i class="far fa-eye"></i> ${post.viewCount} 查看
                    </span>
                </div>
                <a href="post.html?discussion=${post.number}" class="btn-outline">
                    查看详情 <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        container.appendChild(postElement);
    });
}

// 设置事件监听器
function setupEventListeners() {
    // 新帖子按钮
    document.getElementById('newPostBtn').addEventListener('click', createNewPost);
    
    // 过滤器变化时重新渲染
    document.getElementById('categoryFilter').addEventListener('change', renderPosts);
    document.getElementById('sortFilter').addEventListener('change', renderPosts);
}

// 创建新帖子
function createNewPost() {
    alert('在真实环境中，此功能将引导用户到GitHub仓库创建新的Discussion。\n\n步骤：\n1. 打开GitHub仓库页面\n2. 点击"Discussions"标签\n3. 点击"New discussion"按钮\n4. 填写标题和内容\n5. 发布后刷新论坛页面即可看到新帖子');
}

// 获取分类标签
function getCategoryLabel(category) {
    const labels = {
        'tech': '技术讨论',
        'help': '问题求助',
        'project': '项目协作',
        'announce': '社区公告'
    };
    return labels[category] || '讨论';
}

// 加载帖子详情
function loadPostDetails() {
    // 获取URL参数中的讨论编号
    const urlParams = new URLSearchParams(window.location.search);
    const discussionNumber = urlParams.get('discussion');
    
    if (!discussionNumber) {
        document.getElementById('postBody').innerHTML = `
            <div class="error">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>未找到帖子</h3>
                <p>请返回首页选择有效的讨论</p>
            </div>
        `;
        return;
    }
    
    // 模拟API请求延迟
    setTimeout(() => {
        const post = mockDiscussions.find(p => p.number == discussionNumber);
        
        if (post) {
            // 更新页面内容
            document.getElementById('postTitle').textContent = post.title;
            document.getElementById('postAuthor').textContent = post.author;
            document.getElementById('postDate').textContent = `发布于 ${post.date}`;
            document.getElementById('commentCount').textContent = post.commentCount;
            document.getElementById('viewCount').textContent = post.viewCount;
            document.getElementById('postCategoryBreadcrumb').textContent = getCategoryLabel(post.category);
            
            // 格式化帖子内容
            const formattedBody = formatPostContent(post.body);
            document.getElementById('postBody').innerHTML = formattedBody;
            
            // 设置GitHub登录链接
            document.getElementById('githubLoginLink').href = `https://github.com/login?return_to=${encodeURIComponent(window.location.href)}`;
            
            // 初始化评论（模拟）
            renderComments(post.commentCount);
        } else {
            document.getElementById('postBody').innerHTML = `
                <div class="error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>帖子未找到</h3>
                    <p>请求的讨论编号 ${discussionNumber} 不存在</p>
                </div>
            `;
        }
    }, 800);
}

// 格式化帖子内容
function formatPostContent(content) {
    // 在实际应用中，这里应该使用Markdown解析器
    return content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // 粗体
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // 斜体
        .replace(/`(.*?)`/g, '<code>$1</code>') // 行内代码
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>') // 代码块
        .replace(/\n/g, '<br>'); // 换行
}

// 渲染评论
function renderComments(count) {
    const container = document.getElementById('commentsContainer');
    
    if (count === 0) {
        container.innerHTML = `
            <div class="empty-comments">
                <i class="far fa-comment-dots"></i>
                <p>暂无评论，成为第一个评论的人吧！</p>
            </div>
        `;
        return;
    }
    
    // 模拟评论数据
    const comments = [
        {
            author: "CodingExpert",
            date: "1天前",
            body: "非常好的问题！我在使用GitHub Actions时也遇到了类似情况，我的解决方案是检查工作流文件的缩进是否正确。YAML对缩进非常敏感，一个小错误就会导致失败。"
        },
        {
            author: "GitHubFan",
            date: "2天前",
            body: "感谢分享这些技巧！我特别喜欢矩阵构建的部分，帮我节省了很多时间。"
        }
    ];
    
    let commentsHTML = '';
    
    comments.forEach(comment => {
        commentsHTML += `
            <div class="comment">
                <div class="comment-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="comment-content">
                    <div class="comment-header">
                        <span class="comment-author">${comment.author}</span>
                        <span class="comment-date">${comment.date}</span>
                    </div>
                    <div class="comment-body">
                        ${comment.body}
                    </div>
                    <div class="comment-actions">
                        <button><i class="far fa-thumbs-up"></i> 赞</button>
                        <button><i class="fas fa-reply"></i> 回复</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = commentsHTML;
    
    // 添加实际评论系统（Utterances）的占位符说明
    container.innerHTML += `
        <div class="utterances-info">
            <p><i class="fas fa-info-circle"></i> 在实际部署中，此处将显示来自GitHub Discussions的真实评论</p>
            <p>要启用真实评论系统：</p>
            <ol>
                <li>访问 <a href="https://utteranc.es/" target="_blank">Utterances官网</a></li>
                <li>配置你的GitHub仓库</li>
                <li>将生成的脚本添加到页面中</li>
            </ol>
        </div>
    `;
}