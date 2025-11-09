import { db } from '../lib/db'

async function testDatabase() {
  console.log('🧪 Testing database connection and CRUD operations...\n')

  try {
    // 1. Create a test user
    console.log('1️⃣  Creating test user...')
    const testUser = await db.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        credits: 50,
      },
    })
    console.log('✅ User created:', testUser.id)

    // 2. Read the user back
    console.log('\n2️⃣  Reading user back...')
    const fetchedUser = await db.user.findUnique({
      where: { email: 'test@example.com' },
    })
    console.log('✅ User fetched:', fetchedUser?.name)

    // 3. Create a CV for that user
    console.log('\n3️⃣  Creating CV for user...')
    const testCV = await db.cV.create({
      data: {
        userId: testUser.id,
        title: 'Test CV',
        templateId: 'template-001',
        content: {
          personalInfo: { name: 'Test User', email: 'test@example.com' },
          experience: [],
          education: [],
          skills: [],
        },
        designSettings: {
          colors: { primary: '#000000', secondary: '#FFFFFF' },
          typography: { fontFamily: 'Arial' },
        },
      },
    })
    console.log('✅ CV created:', testCV.id)

    // 4. Create a credit transaction
    console.log('\n4️⃣  Creating credit transaction...')
    const transaction = await db.creditTransaction.create({
      data: {
        userId: testUser.id,
        type: 'INITIAL_GRANT',
        amount: 50,
        description: 'Welcome bonus credits',
        balanceAfter: 50,
      },
    })
    console.log('✅ Transaction created:', transaction.id)

    // 5. Update user credits
    console.log('\n5️⃣  Updating user credits...')
    const updatedUser = await db.user.update({
      where: { id: testUser.id },
      data: { credits: 100 },
    })
    console.log('✅ User credits updated to:', updatedUser.credits)

    // 6. Delete test data (cleanup)
    console.log('\n6️⃣  Cleaning up test data...')
    await db.user.delete({
      where: { id: testUser.id },
    })
    console.log('✅ Test user and related data deleted (cascade)')

    console.log('\n✨ All database tests passed successfully!')
    console.log('🎉 Database is properly configured and working!\n')
  } catch (error) {
    console.error('\n❌ Database test failed:', error)
    process.exit(1)
  } finally {
    await db.$disconnect()
  }
}

testDatabase()
